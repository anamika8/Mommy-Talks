// @ts-nocheck
// import dependencies
import React from "react";
// import react-testing methods
import { render, fireEvent, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
import { App } from "../src/app/App.js";
import { Login } from "../src/Components/login/Login.js";

test("Math.sqrt()", () => {
	expect(Math.sqrt(4)).toBe(2);
	expect(Math.sqrt(144)).toBe(12);
	expect(Math.sqrt(2)).toBe(Math.SQRT2);
});
/*
describe("Renders react properly", async() => {
	it("Should render homepage correctly", async () => {
		render(<App />);

		const elem = await screen.queryByText("Moms will not feel alone here !!!");
		expect(elem).not.toBeNull();
		expect(elem).toBeVisible();
	});
});*/


