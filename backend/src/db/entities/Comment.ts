import { Entity, Property, ManyToOne } from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type { Rel } from "@mikro-orm/core";
import { MommyTalksBaseEntity } from "./MommyTalksBaseEntity.js";
import { User } from "./User.js";
import { Forum } from "./Forum.js";
import {SoftDeletable} from "mikro-orm-soft-delete";

@SoftDeletable(() => Comment, "deleted_at", () => new Date())
@Entity({ tableName: "comments" })
export class Comment extends MommyTalksBaseEntity {
	// The person who performed the match/swiped right
	@ManyToOne()
	user!: Rel<User>;

	@ManyToOne()
	forumId!: Rel<Forum>;

	// The account whose profile was swiped-right-on
	@Property()
	comment!: string;

	@Property()
	deleted!: boolean;
}
