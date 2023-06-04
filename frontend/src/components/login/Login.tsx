import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import symbol from './logo.jpg';
import { loginWithEmailAndPassword } from "@/services/Auth.tsx";
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
            <img src={symbol} alt="caption" className="symbol" />
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
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitFailed(true);

        try {
            await loginWithEmailAndPassword(email, password);
            localStorage.setItem('email', email);
            setEmail("");
            setPassword("");
            navigate("/forum");
        } catch (error) {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <fieldset name="Login">
                <legend>Login</legend>
                {errorMessage && <label htmlFor="errorMessage" id="errorMessage" className="errorMessage">{errorMessage}</label>}
                <br />
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
                    Password:
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
        <footer role="contentinfo" className="footerInfo">
            <p>
                Don't have an account?{" "}
                <a href="/" onClick={handleSignupClick}>
                    Sign up
                </a>
            </p>
        </footer>
    );
};