import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import type {Rel} from "@mikro-orm/core";
import {User} from "./User";

@Entity()
export class Forum extends DoggrBaseEntity {
	// The person who posted the forum
	@ManyToOne()
	user!: Rel<User>;

	// The title of the forum
	@Property()
	title!: string;

	// The content of the forum
	@Property()
	content!: string;
}
