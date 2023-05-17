export type ICreateUsersBody = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

export type IUpdateUsersBody = {
	first_name: string;
	last_name: string;
	id: number;
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