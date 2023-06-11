// @ts-nocheck
// import dependencies
import React from "react";
// import react-testing methods
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router} from 'react-router-dom';
import "@testing-library/jest-dom";
import { Home } from "../src/Components/home/Home.js";
import { Login } from '../src/Components/login/Login.js';
import { Signup } from '../src/Components/signup/Signup.js';
import { Forum } from '../src/Components/forum/Forum.js';
import { CreateForum } from '../src/Components/create-forum/CreateForum.js';
import { UserProvider, useUser } from '../src/components/UserContext.tsx';
import { ForumService } from '../src/services/ForumService.tsx';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {vitest} from "vitest";

describe('Home Component', () => {
	it('Should render homepage correctly', () => {
		render(
			<Router>
				<Home />
			</Router>
		);

		const titleElement = screen.getByText('Mommy Talks');
		expect(titleElement).toBeInTheDocument();

		const themeElement = screen.getByText('Moms will not feel alone here !!!');
		expect(themeElement).toBeInTheDocument();

		const buttonContainerElement = screen.getByRole('button', { name: 'Login' });
		expect(buttonContainerElement).toBeInTheDocument();
	});
});


describe('Login Component', () => {
	it('Should render login form correctly', () => {
		render(
			<Router>
				<UserProvider>
					<Login />
				</UserProvider>
			</Router>
		);

		expect(screen.getByLabelText('Email:')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
	});


	it('Should submit form on button click', () => {
		render(
			<Router>
				<UserProvider>
					<Login />
				</UserProvider>
			</Router>
		);

		const emailInput = screen.getByLabelText('Email:');
		userEvent.type(emailInput, 'test@example.com');

		const passwordInput = screen.getByLabelText('Password:');
		userEvent.type(passwordInput, 'Password@123');

		const loginButton = screen.getByRole('button', { name: 'Login' });
		userEvent.click(loginButton);

	});

});

describe('Signup Component', () => {
	it('Should render signup form correctly', () => {
		render(
			<Router>
				<UserProvider>
					<Signup />
				</UserProvider>
			</Router>
		);

		expect(screen.getByLabelText('First Name *')).toBeInTheDocument();
		expect(screen.getByLabelText('Last Name *')).toBeInTheDocument();
		expect(screen.getByLabelText('Email *')).toBeInTheDocument();
		expect(screen.getByLabelText('Password *')).toBeInTheDocument();
		expect(screen.getByLabelText('Verify Password *')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
	});

	it('Should submit form on button click with valid inputs', () => {
		render(
			<Router>
				<UserProvider>
					<Signup />
				</UserProvider>
			</Router>
		);

		const firstNameInput = screen.getByLabelText('First Name *');
		userEvent.type(firstNameInput, 'John');

		const lastNameInput = screen.getByLabelText('Last Name *');
		userEvent.type(lastNameInput, 'Doe');

		const emailInput = screen.getByLabelText('Email *');
		userEvent.type(emailInput, 'test@example.com');

		const passwordInput = screen.getByLabelText('Password *');
		userEvent.type(passwordInput, 'Password@123');

		const verifyPasswordInput = screen.getByLabelText('Verify Password *');
		userEvent.type(verifyPasswordInput, 'Password@123');

		const signupButton = screen.getByRole('button', { name: 'Sign up' });
		userEvent.click(signupButton);
	});
});
describe('Forum Component', () => {
	test('renders header', () => {
		render(
			<Router>
				<Forum />
			</Router>
		);
		const headerElement = screen.getByRole('banner');
		expect(headerElement).toBeInTheDocument();
	});

	test('renders main section', () => {
		render(
			<Router>
				<Forum />
			</Router>
		);
		const mainElement = screen.getByRole('main');
		expect(mainElement).toBeInTheDocument();
	});

	test('navigates to create-forum page on create post button click', () => {
		render(
			<Router>
				<Forum />
			</Router>
		);
		const createPostButton = screen.getByText('Create Post');
		userEvent.click(createPostButton);
		// Assert the navigation or route change
	});

	test('navigates to /forum on feed button click', () => {
		render(
			<Router>
				<Forum />
			</Router>
		);
		const feedButton = screen.getByText('Feed');
		userEvent.click(feedButton);
		// Assert the navigation or route change
	});

	test('performs logout and redirects to / on logout button click', () => {
		render(
			<Router>
				<Forum />
			</Router>
		);
		const logoutButton = screen.getByText('Logout');
		userEvent.click(logoutButton);
		// Assert the logout logic and navigation or route change
	});

	test('renders footer', () => {
		render(
			<Router>
				<Forum />
			</Router>
		);
		const footerElement = screen.getByRole('contentinfo');
		expect(footerElement).toBeInTheDocument();
	});
});

const { Mock } = vitest;

vitest.mock('./UserContext', () => {
	return {
		useUser: Mock.fn(),
	};
});

describe("CreateForum Component", () => {
	test("renders header correctly", () => {
		render(
			<Router>
				<UserProvider>
					<CreateForum />
				</UserProvider>
			</Router>
		);
		const headerElement = screen.getByRole("banner");
		expect(headerElement).toBeInTheDocument();
		const createPostButton = screen.getByRole("link", { name: "Create Post" });
		expect(createPostButton).toBeInTheDocument();
	});

	test("renders create button in header correctly", () => {
		render(
			<Router>
				<UserProvider>
					<CreateForum />
				</UserProvider>
			</Router>
		);
		const createPostButton = screen.getByRole("link", { name: "Create Post" });
		expect(createPostButton).toBeInTheDocument();
	});

});