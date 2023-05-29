import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import symbol from "@/components/forum/logo.jpg";
import "./create-forum.css";

export const CreateForum = () => {
    return (
        <div>
            <Header />
            <MainContent />
        </div>
    );
};

export const MainContent = () => {
    return (
        <main role="main">
            <h1 className="view-pg-title">
                Share How You Feel <i className="fa fa-smile-o" aria-hidden="true"></i>
            </h1>
            <Form />
        </main>
    );
};

export const Form = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitFailed, setSubmitFailed] = useState(false);

    const handleTitleChange = (event) => {
        if (!submitFailed) {
            setTitle(event.target.value);
        }
    };

    const handleContentChange = (event) => {
        if (!submitFailed) {
            setContent(event.target.value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', title, content);


        setTitle("");
        setContent("");
        setSubmitFailed(true);
    };

    return (
        <form onSubmit={handleSubmit} id="query-form">
            <p>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={title} />
            </p>
            <p>
                <textarea
                    name="content"
                    id="ck-editor"
                    placeholder="Content"
                    onChange={handleContentChange}
                    value={content}>
                </textarea>
            </p>
            <p>
                <button type="submit" name="submit" id="create">Create</button>
            </p>
        </form>
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