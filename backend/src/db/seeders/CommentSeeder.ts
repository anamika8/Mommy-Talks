import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Comment } from "../entities/Comment.js";

export class CommentSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		const commentRepo = em.getRepository(Comment);
		// https://mikro-orm.io/docs/seeding#shared-context
		commentRepo.create({
			user: context.user1,
			forumId: context.forum4,
			comment: "My first comment",
			deleted: false
		});
		commentRepo.create({
			user: context.user2,
			forumId: context.forum5,
			comment: "Nice post",
			deleted: false
		});

		commentRepo.create({
			user: context.user5,
			forumId: context.forum2,
			comment: "Check out the article: https://www.sleepfoundation.org/pregnancy/sleep-deprivation-and-postpartum-depression ",
			deleted: false
		});

		commentRepo.create({
			user: context.user4,
			forumId: context.forum2,
			comment: "Thank you so much for your inputs. I am checking it out.",
			deleted: false
		});

		commentRepo.create({
			user: context.user4,
			forumId: context.forum1,
			comment: "Check out this article to learn more: https://www.parents.com/parenting/better-parenting/positive/big-sibling-blues",
			deleted: false
		});
	}
}
