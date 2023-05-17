import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		context.user1 = em.create(User, {
			first_name: "Spot",
			last_name: "Girl",
			email: "email@email.com",
			password: "password",
			role: UserRole.ADMIN,
		});

		context.user2 = em.create(User, {
			first_name: "Wonder",
			last_name: "Woman",
			email: "email2@email.com",
			password: "password",
			role: UserRole.USER,
		});

		context.user3 = em.create(User, {
			first_name: "Teresa",
			last_name: "Twain",
			email: "email3@email.com",
			password: "password",
			role: UserRole.USER,
		});

		context.user4 = em.create(User, {
			first_name: "New",
			last_name: "Mommy",
			email: "email4@email.com",
			password: "password",
			role: UserRole.USER,
		});
	}
}
