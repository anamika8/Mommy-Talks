import { Button, Header, Home, UsersList, Match, Messages , Login, Signup} from "@/components/Components.tsx";
import { useState } from "react";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import reactLogo from "@images/react.svg";
import viteLogo from "/vite.svg";
import "@css/App.css";

// This is our first React "Component"
function App() {
	return (
		<BrowserRouter>
		<div className="App">
			<nav>
				<div className="menu">
					<Link to="/">Home</Link> ||
					<Link to="/login">Login</Link> ||
					<Link to="/signup">Signup</Link>
				</div>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>

		</div>
		</BrowserRouter>
	);
}

export default App;


