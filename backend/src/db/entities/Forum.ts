import {Entity, Property, ManyToOne, Cascade, OneToMany, Collection} from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import { MommyTalksBaseEntity } from "./MommyTalksBaseEntity.js";
import type {Rel} from "@mikro-orm/core";
import {User} from "./User.js";
import {SoftDeletable} from "mikro-orm-soft-delete";
import {Comment} from "./Comment.js";

@SoftDeletable(() => Forum, "deleted_at", () => new Date())
@Entity({ tableName: "forums" })
export class Forum extends MommyTalksBaseEntity {
	// The person who posted the forum
	@ManyToOne()
	user!: Rel<User>;

	// The title of the forum
	@Property()
	title!: string;

	// The content of the forum
	@Property()
	content!: string;

	@OneToMany(() => Comment, (comment) => comment.forumId, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
		orphanRemoval: true,
	})
	all_comments!: Collection<Comment>;
}
