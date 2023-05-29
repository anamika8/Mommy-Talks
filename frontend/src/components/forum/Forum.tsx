import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import symbol from './logo.jpg';
import "./forum.css";

export const Forum = () => {
    return (
        <div>
            <Header />
            <Main />
            <FontawesomeScript />
            <Footer />
        </div>
    );
};

export const Header = () => {
    const navigate = useNavigate();

    const handleLogout = (event) => {
        // Clear user session (example)
        localStorage.removeItem('accessToken'); // Remove access token from local storage

        // Redirect to login page or home page
        navigate('/login');
    };

    const handleCreatePost = (event) => {
        event.preventDefault();
        navigate("/create-forum");
    };

    const handleFeed = (event) => {
        event.preventDefault();
        navigate("/forum");
    };

    return (
        <header role="banner">
            <img src={symbol} alt="caption" className="symbol"/>

            <div id="menu-parent">
                <div id="menu">
                    <ul>
                        <li className="create-menu-item">
                            <a href="/" onClick={handleCreatePost}>
                                <i className="fa fa-user-plus" aria-hidden="true"></i>
                                Create Post
                            </a>
                        </li>
                        <li className="feed-menu-item">
                            <a href="/" onClick={handleFeed}>
                                <i className="fa fa-rss-square" aria-hidden="true"></i>
                                Feed
                            </a>
                        </li>
                        <li className="logout-menu-item">
                            <a href="/" onClick={handleLogout}>
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
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform search or handle search functionality
        console.log('Search term:', searchTerm);
        // Clear the search input field
        setSearchTerm('');
    };

        const handleNextClick = () => {
             console.log("click next");
            //buildAnyPageFeed(feedDataArray, feedIndexStartWith);
        };

        const handlePrevClick = () => {
           console.log("click prev");
            //buildAnyPageFeed(feedDataArray, feedIndexStartWith);
        };

    return (
        <div id="search-section">
            <div className="input-container">
                <input
                    type="text"
                    id="search"
                    placeholder="Search Topics..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <i className="fa fa-search icon" id="search-icon" onClick={handleSubmit}></i>
            </div>

            <div className="pages">
                <a className="pages-button" id="prev" onClick={handlePrevClick}>&lt; Prev</a>
                <a className="pages-button" id="next" onClick={handleNextClick}>Next &gt;</a>
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
        <footer role="contentinfo" className="footerForum">
            © 2023 created by Anamika
        </footer>
    );
};