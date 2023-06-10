// @ts-nocheck
// import dependencies
import React from "react";
// import react-testing methods
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from 'react-router-dom';

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
import { Home } from "../src/Components/home/Home.js";

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



