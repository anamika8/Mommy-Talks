import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.jpg';
import "./login.css";

export const Login = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export const Header = () => {
    return (
        <header role="banner">
            <img src={logo} alt="caption" className="logo" />
        </header>
    );
};
export const Main = () => {
    return (
        <main role="main">
            <LoginForm />
        </main>
    );
};
export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitFailed, setSubmitFailed] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        if (!submitFailed) {
            setEmail(event.target.value);
        }
    };

    const handlePasswordChange = (event) => {
        if (!submitFailed) {
            setPassword(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted:", email, password);

        // Save user email in local storage
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        setEmail("");
        setPassword("");
        setSubmitFailed(true);

        // Navigate to a different page after submission
        navigate("/signup");
    };


    return (
        <form onSubmit={handleSubmit} className="login-form">
            <fieldset name="Login">
                <legend>Login</legend>
                <label htmlFor="errorMessage" id="errorMessage" className="hidden errorMessage">
                </label>
                <br/>
                <label htmlFor="email">
                    Email:
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </label>
                <label htmlFor="password">
                    Your Password:
                    <input
                        id="password"
                        type="password"
                        name="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                        placeholder="Welcome@1"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
                        onChange={handlePasswordChange}
                        value={password}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </fieldset>
        </form>
    );
};

export const Footer = () => {
    const navigate = useNavigate();

    const handleSignupClick = (event) => {
        event.preventDefault();
        navigate("/signup");
    };

    return (
        <footer role="contentinfo" className="footer">
            <p>
                Don't have an account?{" "}
                <a href="/" onClick={handleSignupClick}>
                    Sign up
                </a>
            </p>
        </footer>
    );
};