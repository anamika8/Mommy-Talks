import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import symbol from './logo.jpg';
import "./Signup.css";

export const Signup = () => {
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
        if (!submitFailed) {
            setPassword(event.target.value);
        }
    };

    const handleVerifyPasswordChange = (event) => {
        if (!submitFailed) {
            setVerifyPassword(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform form submission logic here

        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVerifyPassword('');
        setSubmitFailed(true);
        // Navigate to a different page after submission
        navigate("/login");
    };

    return (
        <form role="form" action="/signup" method="post" className="signup-form" onSubmit={handleSubmit}>
            <fieldset name="Sign up">
                <legend>Welcome!</legend>
                <label htmlFor="errorMessage" id="errorMessage" className="hidden errorMessage">
                </label>

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
        <footer role="contentinfo" className="footer">
            <p>
                Don't have an account?{" "}
                <a href="/" onClick={handleLoginClick}>
                    Log in
                </a>
            </p>
        </footer>
    );
};
