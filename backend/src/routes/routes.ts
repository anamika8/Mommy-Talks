import dotenv from "dotenv";
dotenv.config();

import { FastifyInstance } from "fastify";
import { UserRoutesInit } from "./user_routes.js";
import {ForumRoutesInit} from "./forum_routes.js";
import {CommentRoutesInit} from "./comment_routes.js";

/** This function creates all backend routes for the site
 *
 * @param {FastifyInstance} app - The base Fastify listen server instance
 * @param {{}} _options - Fastify instance options (Optional)
 * @returns {Promise<void>} - Returns all the initialized routes
 */
async function MommyTalkRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	UserRoutesInit(app);
	ForumRoutesInit(app);
	CommentRoutesInit(app)
}

export default MommyTalkRoutes;
