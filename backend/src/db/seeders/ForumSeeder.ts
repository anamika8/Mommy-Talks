import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Forum } from "../entities/Forum.js";

export class ForumSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		const forumRepo = em.getRepository(Forum);
		// https://mikro-orm.io/docs/seeding#shared-context
		forumRepo.create({
			user: context.user1,
			title: "Hi",
			content: "Test message 1",
		});
		forumRepo.create({
			user: context.user2,
			title: "Introduction",
			content: "Hi, I am User-2",
		});
	}
}
