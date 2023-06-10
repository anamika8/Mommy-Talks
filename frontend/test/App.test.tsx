// @ts-nocheck
// import dependencies
import React from "react";
// import react-testing methods
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';
// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
import { Home } from "../src/Components/home/Home.js";
import { Login } from '../src/Components/login/Login.js';
//import { UserContext } from '../src/components/UserContext.js';
import { UserProvider } from '../src/components/UserContext.tsx';
import userEvent from '@testing-library/user-event';


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
