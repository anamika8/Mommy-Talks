import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Comment} from "../entities/Comment.js";
import {User} from "../entities/User.js";

export class CommentSeeder extends Seeder {

	async run(em: EntityManager): Promise<void> {
		const user1Email = "email@email.com";
		const user1 = await em.findOne(User, { email: user1Email });
		const user2Email = "email2@email.com";
		const user2 = await em.findOne(User, { email: user2Email });
		const user3Email = "email3@email.com";
		const user3 = await em.findOne(User, { email: user2Email });


		em.create(Comment, {
			theSender: user1,      
			comment: "Hi, Seeder Comment",
			deleted: false
		});

		em.create(Comment, {
			theSender: user1,
			comment: "Hi",
			deleted: false
		});

		em.create(Comment, {
			theSender: user2,
			comment: "Hi, How are you doing?",
			deleted: false
		});

		em.create(Comment, {
			theSender: user3,
			comment: "Hi there, how are you?",
			deleted: false
		});

		em.create(Comment, {
			theSender: user1,
			comment: "Hey there",
			deleted: false
		});

		em.create(Comment, {
			theSender: user2,
			comment: "Hey whatsup",
			deleted: false
		});

		em.create(Comment, {
			theSender: user2,
			comment: "oops sorry",
			deleted: true
		});

	}

}
