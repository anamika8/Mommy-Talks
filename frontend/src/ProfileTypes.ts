export type State = {
	currentProfile: ProfileType
	forumHistory: Array<ForumType>
}

export type ProfileType = {
	firstName: string,
	lastName: string,
	email: string,
	id: number,
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
