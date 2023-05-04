import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Comment } from "./Comment.js";

@Entity({ tableName: "users"})
export class User extends BaseEntity {	
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;
	
	@Property()
	petType!: string;

	// Note that these DO NOT EXIST in the database itself!	
	//a user can send lot of messages
	@OneToMany(
		() => Comment,
		comment => comment.theSender,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	sent!: Collection<Comment>;

}
