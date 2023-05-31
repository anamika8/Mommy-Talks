export type State = {
	currentProfile: ProfileType
	forumHistory: Array<ForumType>
}

export type ProfileType = {
	first_name: string,
	last_name: string,
	email: string,
	id: number,
	password: string,
	last_login: string,
	created_at: string,
	updated_at: string,
	deleted_at: string,
}

export type ForumType = {
	id: number,
	created_at: string,
	updated_at: string,
	deleted_at: string,
	user: number,
	title: string,
	content: string,
}

export type CommentType = {
	id: number,
	created_at: string,
	updated_at: string,
	deleted_at: string,
	user: number,
	forumId: number,
	comment: string,
	deleted: boolean,
}