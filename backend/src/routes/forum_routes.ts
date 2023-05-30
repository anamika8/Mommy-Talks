import { FastifyInstance } from "fastify";
import {Forum} from "../db/entities/Forum.js";
import {ICreateForum} from "../types";
import {User} from "../db/entities/User.js";

export function ForumRoutesInit(app: FastifyInstance) {

	// Route that returns all topics
	app.get("/topics", async (req, reply) => {
		try {
			const topics = await req.em.find(Forum, {});
			reply.send(topics);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// search topics by title
	app.search<{ Body: { forum_title: string } }>("/topics", async (req, reply) => {
		const { title } = req.body;

		try {
			const topics = await req.em.find(Forum, { title: { $ilike: `%${title}%` }, deleted_at: null });
			return reply.send(topics);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	app.search<{ Body: { forum_id: number } }>("/forums/id", async (req, reply) => {
		const { id } = req.body;

		try {
			const forumEntity = await req.em.findOne(Forum, {id, deleted_at: null});
			return reply.send(forumEntity);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	const badwordsCheck = (title, content) => {
		let badWord = undefined;
		title.split(" ").forEach((word) => {
			if (app.badwords.has(word)) {
				badWord = word;
			}
		});

		if (badWord === undefined) {
			content.split(" ").forEach((word) => {
				if (app.badwords.has(word)) {
					badWord = word;
				}
			});
		}
		console.log(`Bad Word found = ${badWord}`);
		return badWord;
	};

	app.post<{ Body: ICreateForum }>("/forum", async (req, reply) => {
		const { user, title, content } = req.body;

		// Check for bad words in title
		const badWord = badwordsCheck(title, content)
		if (badWord !== undefined) {
			return reply.status(500).send({ message: "Bad words naughty list added." });
		}

		try {
			//Find our two user IDs, so we can link them into our new message
			const userEntity = await req.em.findOne(User, { email: user });
			console.log(`User '${userEntity.first_name} ${userEntity.last_name}' posting a new forum`);
			// Create the new message
			const newForum = await req.em.create(Forum, {
				user: userEntity,
				title: title,
				content: content,
			});
			// Send the changes to the database
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send(newForum);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	// UPDATE
	app.put<{Body: { forumId: string, title: string, content: string }}>("/forum", async(req, reply) => {
		const { forumId, title, content} = req.body;
		const id = parseInt(forumId);
		const badWord = badwordsCheck(title, content);

		if (badWord === undefined) {
			try{
				const forumToUpdate = await req.em.findOne(Forum, { id, "deleted_at": null });
				if (forumToUpdate == null) {
					console.log(`No forum with the id - ${id} exists.`);
					// send blank output if message id is not present
					return reply.status(500).send(`No forum with the id - ${id} exists.`);
				}
				if (title !== undefined) {
					forumToUpdate.title = title;
				}
				if (content !== undefined) {
					forumToUpdate.content = content;
				}
				await req.em.flush();
				console.log(forumToUpdate);
				reply.send(forumToUpdate);
			} catch (err) {
				console.error(err);
				return reply.status(500).send(err);
			}
		} else {
			const errorMessage = "Your message contains some naughty words. Please remove the words and try again";
			console.error(errorMessage);
			reply.status(500).send({
				message: errorMessage
			});
		}
	});

	// DELETE
	app.delete<{Body: { forumId: string}}>("/forum", async(req, reply) => {
		const { forumId} = req.body;
		const id = parseInt(forumId);
		try {
			// using reference is enough, no need for a fully initialized entity
			const forumToDelete = await req.em.findOne(Forum, { id, "deleted_at": null });
			if (forumToDelete !== null) {
				forumToDelete.deleted_at = new Date();
				console.log(forumToDelete);
				//soft delete
				await req.em.flush();
				reply.send(forumToDelete);
			} else {
				// send 500 error if message id is not present
				return reply.status(500).send(`No messages to delete`);
			}
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
}
