import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Comment } from "../entities/Comment.js";

export class CommentSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		const commentRepo = em.getRepository(Comment);
		// https://mikro-orm.io/docs/seeding#shared-context
		commentRepo.create({
			user: context.user1,
			forumId: context.forum1,
			comment: "My first comment",
			deleted: false
		});
		commentRepo.create({
			user: context.user2,
			forumId: context.forum2,
			comment: "Nice post",
			deleted: false
		});
	}
}
