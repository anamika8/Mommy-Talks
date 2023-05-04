/** @module Models/Message */

import { Entity, Property, Unique, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";
import type {Rel} from "@mikro-orm/core";


@Entity()
export class Comment extends BaseEntity{

	// The person who send the Comments
	@ManyToOne()
	theSender!: Rel<User>;

	// the message content
    @Property()
	comment!: string;

	// Used for soft-deletes. Set to true when deleted
	@Property()
	deleted: boolean;
}