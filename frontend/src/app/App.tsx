import {Home, Login, Signup, Forum, CreateForum, UpdateForum} from "@/components/Components.tsx";
import { UserProvider } from '@/components/UserContext.tsx';
import { useState } from "react";
import { Link, Route, Routes, Router, BrowserRouter, useLocation } from "react-router-dom";
import reactLogo from "@images/react.svg";
import viteLogo from "/vite.svg";
//import "@css/App.css";

// This is our first React "Component"
/*
function App() {
	return (
		<BrowserRouter>
		<div className="App">
			<nav>
				<div className="menu">
					<Link to="/">Home</Link> ||
					<Link to="/login">Login</Link> ||
					<Link to="/signup">Signup</Link> ||
					<Link to="/forum">Forum</Link>
				</div>
			</nav>

			<UserProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forum" element={<Forum />} />
					<Route path="/create-forum" element={<CreateForum />} />
					<Route path="/update-forum" element={<UpdateForum />} />
				</Routes>
			</UserProvider>
		</div>
		</BrowserRouter>
	);
}*/


function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<UserProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forum" element={<Forum />} />
					<Route path="/create-forum" element={<CreateForum />} />
					<Route path="/update-forum" element={<UpdateForum />} />
				</Routes>
				</UserProvider>
			</div>
		</BrowserRouter>
	);
}
export default App;


