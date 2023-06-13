import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {signup} from "@/services/Auth.tsx";
import symbol from './logo.jpg';
import "./Signup.css";

export const Signup = () => {
    return (
        <div className="signup-page">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export const Header = () => {
    return (
        <header role="banner">
            <img src={symbol} alt="caption" className="symbol"/>
        </header>
    );
};
export const Main = () => {
    return (
        <main role="main">
            <SignupForm />
        </main>
    );
};

export const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [submitFailed, setSubmitFailed] = useState(false);
    const [uid, setUid] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleFirstNameChange = (event) => {
        if (!submitFailed) {
            setFirstName(event.target.value);
        }
    };

    const handleLastNameChange = (event) => {
        if (!submitFailed) {
            setLastName(event.target.value);
        }
    };

    const handleEmailChange = (event) => {
        if (!submitFailed) {
            setEmail(event.target.value);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleVerifyPasswordChange = (event) => {
        const verifyPasswordValue = event.target.value;
        setVerifyPassword(verifyPasswordValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //setPasswordMatchError(password !== verifyPassword);
            console.log(`${password} ${verifyPassword}`);
            if (password !== verifyPassword) {
                const errorMessage = 'Password and Verify Password do NOT match';
                setErrorMessage(errorMessage);
                setPassword("");
                setVerifyPassword("");
            } else {
                // Perform form submission logic here
                await signup(email, password, firstName, lastName);
                // Navigate to a different page after submission
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Sign up failed. Please try again later.");
            }
        }
    };

    return (
        <form role="form" action="/signup" method="post" className="signup-form" onSubmit={handleSubmit}>
            <fieldset name="Sign up">
                <legend>Welcome!</legend>
                {errorMessage && <label htmlFor="errorMessage" id="errorMessage" className="errorMessage">{errorMessage}</label>}
                <br />
                <label htmlFor="firstName">First Name *</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Test"
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                />

                <label htmlFor="lastName">Last Name *</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Mommy"
                    required
                    value={lastName}
                    onChange={handleLastNameChange}
                />

                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@email.com"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />

                <label htmlFor="user-password">Password *</label>
                <input
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                    name="user-password"
                    id="user-password"
                    placeholder="Welcome@1"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />

                <label htmlFor="verify-password">Verify Password *</label>
                <input
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                    name="verify-password"
                    id="verify-password"
                    placeholder="Welcome@1"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
                    required
                    value={verifyPassword}
                    onChange={handleVerifyPasswordChange}
                />

                <button type="submit">Sign up</button>
            </fieldset>
        </form>
    );
};

export const Footer = () => {
    const navigate = useNavigate();

    const handleLoginClick = (event) => {
        event.preventDefault();
        navigate("/login");
    };

    return (
        <footer role="contentinfo" className="footerInfo">
            <p>
                Don't have an account?{" "}
                <a href="/" onClick={handleLoginClick}>
                    Log in
                </a>
            </p>
        </footer>
    );
};
