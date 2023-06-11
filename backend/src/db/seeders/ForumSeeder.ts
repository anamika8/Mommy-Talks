import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Forum } from "../entities/Forum.js";

export class ForumSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		const forumRepo = em.getRepository(Forum);
		// https://mikro-orm.io/docs/seeding#shared-context
		context.forum1 =  forumRepo.create({
			user: context.user5,
			title: "Helping Your Child Adjust to a New Sibling",
			content: "No matter your child’s personality, they’ll have some adjusting to do when a new sibling enters the scene. These tactics can make the changes easier for the entire family.",
		});
		context.forum2 =  forumRepo.create({
			user: context.user4,
			title: "Sleep Deprivation and Postpartum Depression",
			content: "Sleep deprivation is an unavoidable part of being a new mother. The sudden shifts in hormone levels accumulated fatigue from pregnancy.",
		});
		context.forum3 =  forumRepo.create({
			user: context.user4,
			title: "New Mommy",
			content: "Hi All, I am a new mommy and I am unable to get enough sleep at night. Can you please help me out with some good suggestions for my problem? Thanks to all.",
		});
		context.forum4 =  forumRepo.create({
			user: context.user3,
			title: "A Guide for First-Time Parents",
			content: "If you're a new parent, get the basics in this guide about burping, bathing, bonding, and other baby-care concerns.",
		});
		context.forum5 = forumRepo.create({
			user: context.user1,
			title: "Hi",
			content: "Test message 1",
		});
		context.forum6 =  forumRepo.create({
			user: context.user2,
			title: "Introduction",
			content: "Hi, I am User-2",
		});

	}
}
