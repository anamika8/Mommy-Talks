import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";
import admin from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config();

export function UserRoutesInit(app: FastifyInstance) {
	// Read the Firebase config from .env
	const firebaseConfig = {
		type: process.env.FIREBASE_TYPE,
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		clientId: process.env.FIREBASE_CLIENT_ID,
		authUri: process.env.FIREBASE_AUTH_URI,
		tokenUri: process.env.FIREBASE_TOKEN_URI,
		authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
	};
	admin.initializeApp({
		credential: admin.credential.cert(firebaseConfig),
	});

	app.post<{ Body: ICreateUsersBody }>("/signup", async (req, reply) => {
		const { first_name, last_name, email, password } = req.body;
		try {
			const user = await admin.auth().createUser({
				email,
				password,
			});
			const newUser = await req.em.create(User, {
				first_name,
				last_name,
				email,
				uuid: user.uid,
				// We'll only create Admins manually!
				role: UserRole.USER,
			});

			await req.em.flush();
			return reply.send(newUser);
		} catch (error) {
			reply.code(400).send({ error: error.message });
		}
	});

	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users", async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// User CRUD
	// Refactor note - We DO use email still for creation!  We can't know the ID yet
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		const { first_name, last_name, email, password } = req.body;

		try {
			const newUser = await req.em.create(User, {
				first_name,
				last_name,
				email,
				// We'll only create Admins manually!
				role: UserRole.USER,
			});

			await req.em.flush();
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//READ
	app.search("/users", async (req, reply) => {
		const { id, uuid } = req.body;
		let searchOptions = {};
		if (id && uuid) {
			searchOptions = { id, uuid, deleted_at: null };
		} else if (id) {
			searchOptions = { id, deleted_at: null };
		} else if (uuid) {
			searchOptions = { uuid, deleted_at: null };
		} else {
			reply.status(400).send("Please provide id, uuid, or both for searching users.");
			return;
		}
		try {
			const theUser = await req.em.findOneOrFail(User, searchOptions, { strict: true });
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { first_name, id, last_name } = req.body;

		const userToChange = await req.em.findOneOrFail(User, { id: Number(id) }, { strict: true });
		userToChange.first_name = first_name;
		userToChange.last_name = last_name;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// DELETE
	app.delete<{ Body: { my_id: number; id_to_delete: number } }>(
		"/users",
		async (req, reply) => {
			const { my_id, id_to_delete } = req.body;

			try {
				// Authenticate my user's role
				const me = await req.em.findOneOrFail(User, { id: Number(my_id) }, { strict: true });
				// Check passwords match
				/*
				if (me.role !== UserRole.ADMIN) {
					return reply.status(401).send();
				}
				 */

				// Make sure the requester is an Admin
				if (me.role === UserRole.USER) {
					return reply.status(401).send({ message: "You are not an admin!" });
				}
				const theUserToDelete = await req.em.findOneOrFail(User, { id: Number(id_to_delete) }, { strict: true });
				if (theUserToDelete.role === UserRole.ADMIN) {
					return reply.status(500).send({ message: "You cannot delete an Admin!" });
				}
				theUserToDelete.deleted_at = new Date();
				await req.em.flush();
				try {
					await admin.auth().deleteUser(theUserToDelete.uuid);
					console.log('User deleted successfully from Firebase');
				} catch (error) {
					console.error('Error deleting user from Firebase:', error);
				}
				return reply.send(theUserToDelete);
			} catch (err) {
				return reply.status(500).send(err);
			}
		}
	);
}
