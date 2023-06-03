import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context
		context.user0 = em.create(User, {
			first_name: "Firebase",
			last_name: "Auth",
			email: "firebase@email.com",
			uuid: "Qci0x8jTlAapxa2hZusgrGr9IlC3",
			role: UserRole.ADMIN,
		});

		context.user1 = em.create(User, {
			first_name: "Eliza",
			last_name: "S",
			email: "email@email.com",
			//"password": "Welcome@5"
			uuid: "gKroNYOdIkcCKQjswkZRewWBqz02",
			role: UserRole.USER,
		});

		context.user2 = em.create(User, {
			first_name: "Wonder",
			last_name: "Woman",
			email: "email2@email.com",
			//password: "Welcome@4"
			uuid: "RpZHtRLlQ6bOHZ73Cw0FW4hIOZH3",
			role: UserRole.USER,
		});

		context.user3 = em.create(User, {
			first_name: "Kira",
			last_name: "W",
			email: "email3@email.com",
			//password: "Welcome@3"
			uuid: "hKlVRfT972Q6lVZ0wLTrEedeIap2",
			role: UserRole.USER,
		});

		context.user4 = em.create(User, {
			first_name: "New",
			last_name: "Mommy",
			email: "email4@email.com",
			//password: "Welcome@2"
			uuid: "9EzOEjs1bXW03RLa1lC7ow38HJw1",
			role: UserRole.USER,
		});

		context.user5 = em.create(User, {
			first_name: "Test",
			last_name: "Mommy",
			email: "example@email.com",
			uuid: "KjmQcT2gAcbCFghMdNqA5mJyOPg2",
			role: UserRole.USER,
		});
	}
}
