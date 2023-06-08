export type ICreateUsersBody = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
};

export type IUpdateUsersBody = {
	first_name: string;
	last_name: string;
	last_login: Date;
	id: number;
	uuid: string;
};

export type ICreateForum = {
	title: string;
	content: string;
	user: string;
};