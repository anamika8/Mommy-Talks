import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";
import symbol from './logo.jpg';
import "./Home.css";

// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage

/*
 ** Hooks—functions starting with `use`—can only be called at the top level of your components
 * or [your own Hooks.](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks)**
 * You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions,
 * but it’s helpful to think of them as unconditional declarations about your component’s needs.
 * You “use” React features at the top of your component similar to how you “import” modules
 * at the top of your file.
 */
export const Home = () => {
    return (
        <div className="js-container">
            <Header />
            <Main />
            <Footer />
            <FontawesomeScript />
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
const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a login page
        navigate('/Login');
    };

    return (
        <button onClick={handleClick}>Login</button>
    );
};

const SignupButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a signup page
        navigate('/Signup');
    };

    return (
        <button onClick={handleClick}>Signup</button>
    );
};


const Main = () => (
    <main role="main">
        <div className="app-first-page">
            <h1 className="app-title">Mommy Talks</h1>
            <h2 className="theme">Moms will not feel alone here !!!</h2>
            <p className="theme-details">
                A place for new, upcoming and experienced mothers to share their concern, get helpful suggestions.
            </p>
            <ButtonContainer />
        </div>
    </main>
);
const FacebookButton = () => {
    const handleFacebookLogin = () => {
        // Open Facebook login page in a new tab/window
        window.open('https://facebook.com/login', '_blank');
    };

    return (
        <button onClick={handleFacebookLogin}>
            <i className="fa fa-facebook-official" aria-hidden="true"></i> Facebook
        </button>
    );
};
const ButtonContainer = () => (
    <div className="button-container">
        <LoginButton />
        <SignupButton />
        <FacebookButton />
    </div>
);

const Footer = () => (
    <footer role="contentinfo" className="footerInfo">
        <p>
            Demo Credentials: <br />
            Email: example@email.com <br />
            Password: Welcome@1
        </p>
    </footer>
);
const FontawesomeScript = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://use.fontawesome.com/3a36aded45.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};



