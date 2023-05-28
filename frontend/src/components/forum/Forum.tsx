import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import symbol from './logo.jpg';
import "./forum.css";

export const Forum = () => {
    return (
        <div>
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

            <div id="menu-parent">
                <div id="menu">
                    <ul>
                        <li className="create-menu-item">
                            <a href="/create-forum.html">
                                <i className="fa fa-user-plus" aria-hidden="true"></i>
                                Create Post
                            </a>
                        </li>
                        <li className="feed-menu-item">
                            <a href="/forum.html">
                                <i className="fa fa-rss-square" aria-hidden="true"></i>
                                Feed
                            </a>
                        </li>
                        <li className="logout-menu-item">
                            <a href="/logout">
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
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

const SearchSection = () => {
    return (
        <div id="search-section">
            <div className="input-container">
                <input type="text" id="search" placeholder="Search Topics..." />
                <i className="fa fa-search icon" id="search-icon"></i>
            </div>

            <div className="pages">
                <a className="pages-button" id="prev">&lt; Prev</a>
                <a className="pages-button" id="next">Next &gt;</a>
            </div>
        </div>
    );
};

const PostResult = () => {
    return (
        <div className="post_log colm-4 border">
            <span className="result">Title: </span>
            <span className="result">Content: </span>
            <a className="more-details">Learn More</a>
        </div>
    );
};

export const Main = () => {
    return (
        <main role="main">
            <SearchSection />

            <div className="post_results rows" id="allFeed">
                <PostResult />
                <PostResult />
                <PostResult />
            </div>
        </main>
    );
};

export const Footer = () => {
    return (
        <footer role="contentinfo" className="footerInfo">
            © 2023 created by Anamika
        </footer>
    );
};