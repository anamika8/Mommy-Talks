import { FastifyInstance } from "fastify";
import {Forum} from "../db/entities/Forum.js";

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

	app.search<{ Body: { forum_id: number } }>("/forums/id", async (req, reply) => {
		const { id } = req.body;

		try {
			const forumEntity = await req.em.getReference(Forum, id);
			return reply.send(forumEntity);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
}
