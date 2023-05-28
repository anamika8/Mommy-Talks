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
/*export const Home = () => {
    return (
        <div>
            <Header />
            <Title />
            <Subtitle />
            <Main />
            <LoginButton />
            <SignupButton />
        </div>
    );
};*/

export const Home = () => {
    return (
        <main role="main">
            <Header />
            <Main />
            <LoginButton />
            <SignupButton />
            <FacebookButton />
            <FontawesomeScript />
        </main>
    );
};

export const Header = () => {
    return (
        <header role="banner">
            <img src={symbol} alt="caption" className="symbol"/>
        </header>
    );
};
/*
export function Title() {
    return(<h1>Mommy Talks</h1>);
}

export function Subtitle() {
    return(<h3>Moms will not feel alone here!!!</h3>);
}

export function Main() {
    return(<p className="theme-details">A place for new, upcoming and experienced mothers to share their concern, get
        helpful suggestions.</p>
    );
}

const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a different page
        navigate('/Login');
    };

    return (
        <button onClick={handleClick}>Login</button>
    );
};

const SignupButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a different page
        navigate('/Signup');
    };

    return (
        <button onClick={handleClick}>Signup</button>
    );
};
*/



const Title = () => {
    return <h2 className="theme">Moms will not feel alone here !!!</h2>;
};

const Subtitle = () => {
    return <p className="theme-details">A place for new, upcoming and experienced mothers to share their concern, get helpful suggestions.</p>;
};

const Main = () => {
    return (
        <div className="app-first-page">
            <Title />
            <Subtitle />
        </div>
    );
};

const LoginButton = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        // Handle login button click event
        navigate('/Login');
    };

    return (
        <button onClick={handleLoginClick}>
            <i className="fa fa-sign-in" aria-hidden="true"></i> Login
        </button>
    );
};

const SignupButton = () => {
    const navigate = useNavigate();
    const handleSignupClick = () => {
        // Navigate to a different page
        navigate('/Signup');
    };

    return (
        <button onClick={handleSignupClick}>
            <i className="fa fa-user-plus" aria-hidden="true"></i> Signup
        </button>
    );
};

const FacebookButton = () => {
    const handleFacebookClick = () => {
        // Handle Facebook button click event
        window.location.href = 'https://facebook.com/';
    };

    return (
        <button onClick={handleFacebookClick}>
            <i className="fa fa-facebook-official" aria-hidden="true"></i> Facebook
        </button>
    );
};


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



