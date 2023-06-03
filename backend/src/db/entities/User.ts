import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { MommyTalksBaseEntity } from "./MommyTalksBaseEntity.js";

import { Enum } from "@mikro-orm/core";
import {Forum} from "./Forum.js";
import {Comment} from "./Comment.js";

export enum UserRole {
	ADMIN = "Admin",
	USER = "User",
}

// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes, it's really that easy.
@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users" })
export class User extends MommyTalksBaseEntity {
	@Property()
	@Unique()
	email!: string;

	@Property()
	first_name!: string;

	@Property()
	last_name!: string;

	@Property()
	uuid!: string;

	@Property({ nullable: true })
	last_login?: Date;

	@Enum(() => UserRole)
	role!: UserRole; // string enum

	// Note that these DO NOT EXIST in the database itself!

	// Orphan removal used in our Delete All Sent Messages route to single-step remove via Collection
	@OneToMany(() => Forum, (forum) => forum.user, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
		orphanRemoval: true,
	})
	forums_posted!: Collection<Forum>;

	@OneToMany(() => Comment, (comment) => comment.user, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
		orphanRemoval: true,
	})
	comments_posted!: Collection<Comment>;
}
