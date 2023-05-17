export type ICreateUsersBody = {
	name: string;
	email: string;
	password: string;
	petType: string;
};

export type IUpdateUsersBody = {
	name: string;
	id: number;
	petType: string;
};

export type ICreateForum = {
	title: string;
	content: string;
	user: string;
};

export type ICreateComment = {
	comment: string;
	forumId: number;
	user: string;
};