import { FastifyInstance } from "fastify";
import {Forum} from "../db/entities/Forum.js";
import {Comment} from "../db/entities/Comment.js";
import {ICreateComment} from "../types";
import {User} from "../db/entities/User.js";

export function CommentRoutesInit(app: FastifyInstance) {

	// Route that returns all topics
	app.get("/comments", async (req, reply) => {
		try {
			const comments = await req.em.find(Comment, {});
			reply.send(comments);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	app.search<{ Body: { comment_id: number } }>("/comments/id", async (req, reply) => {
		const { id } = req.body;

		try {
			const commentEntity = await req.em.find(Comment, {forumId: id, deleted_at: null});
			return reply.send(commentEntity);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	const badwordsCheck = (comment) => {
		let badWord = undefined;
		comment.split(" ").forEach((word) => {
			if (app.badwords.has(word)) {
				badWord = word;
			}
		});
		console.log(`Bad Word found = ${badWord}`);
		return badWord;
	};

	// CREATE
	app.post<{ Body: ICreateComment }>("/comment", async (req, reply) => {
		const { user, forumId, comment } = req.body;

		// Check for bad words in title
		const badWord = badwordsCheck(comment)
		if (badWord === undefined) {
			try {
				const userEntity = await req.em.findOne(User, {email: user});
				const forumEntity = await req.em.findOne(Forum, {id: forumId});
				console.log(`User '${userEntity.first_name} ${userEntity.last_name}' adding a new comment to forum# ${forumId}`);
				// Create the new message
				const newForum = await req.em.create(Comment, {
					user: userEntity,
					forumId: forumId,
					comment: comment,
					deleted: false
				});
				// Send the changes to the database
				await req.em.flush();

				// Let the user know everything went fine
				return reply.send(newForum);
			} catch (err) {
				return reply.status(500).send({message: err.message});
			}
		} else {
			return reply.status(500).send({message: "Bad words naughty list added."});
		}
	});


	// UPDATE
	app.put<{Body: { commentId: string, comment: string }}>("/comment", async(req, reply) => {
		const { commentId, comment} = req.body;
		const id = parseInt(commentId);
		const badWord = badwordsCheck(comment);

		if (badWord !== undefined) {
			const errorMessage = "Your message contains some naughty words. Please remove the words and try again";
			console.error(errorMessage);
			reply.status(500).send({
				message: errorMessage
			});
		} else {
			try {
				const commentToUpdate = await req.em.findOne(Comment, {id, "deleted_at": null});
				if (commentToUpdate == null) {
					console.log(`No comment with the id - ${id} exists.`);
					// send blank output if message id is not present
					return reply.status(500).send(`No comment with the id - ${id} exists.`);
				}
				if (comment !== undefined && comment !== "") {
					commentToUpdate.comment = comment;
				}
				await req.em.flush();
				console.log(commentToUpdate);
				reply.send(commentToUpdate);
			} catch (err) {
				console.error(err);
				return reply.status(500).send(err);
			}
		}
	});

	// DELETE
	app.delete<{Body: { commentId: string, password: string }}>("/comment",
		async (req, reply) => {
			const {commentId, password} = req.body;
			const id = parseInt(commentId);
			try {
				// using reference is enough, no need for a fully initialized entity
				const commentToDelete = await req.em.findOne(Comment, {id, "deleted": false});
				if (commentToDelete !== null) {
					commentToDelete.deleted_at = new Date();
					commentToDelete.deleted = true;
					console.log(commentToDelete);
					//soft delete
					await req.em.flush();
					reply.send(commentToDelete);
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
