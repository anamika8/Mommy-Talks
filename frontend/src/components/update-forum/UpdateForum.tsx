import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import symbol from "@/components/forum/logo.jpg";
import "./update-forum.css";
export const UpdateForum = () => {
    return (
        <div>
            <Header />
            <MainComponent />
            <FontawesomeScript />
        </div>
    );
};
export const MainComponent = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comment, setComment] = useState('');
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
    const handleUpdate = (event) => {
        // Handle update logic here
        event.preventDefault();
        console.log("Submitted:", title, content);

        setTitle("");
        setContent("");
        setSubmitFailed(true);

    };

    const handleDelete = (event) => {
        // Handle delete logic here
        event.preventDefault();
        console.log("Deleted");
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentChangeSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Handle comment submission logic here
            // e.g., Post the comment to the server

            // Reset the comment input
            setComment('');

            // Log the comment
            console.log('Comment posted:', comment);
        }
    };

    return (
        <main role="main">
            <form action="/query" method="post" id="query-form">
                <p>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </p>
                <div id="content-section" className="colm-4">
                    <p>
                        <textarea
                            name="content"
                            id="mt-editor"
                            placeholder="Content"
                            onChange={handleContentChange}
                            value={content}>
                        </textarea>
                    </p>
                    <span id="user-info">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i> User: Test Mommy
                    </span>
                </div>
                <br />
                <div id="outer">
                    <div className="inner">
                        <button type="button" name="submit" id="updatePost" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                    <div className="inner">
                        <button type="button" name="submit" id="deletePost" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </form>

            <div className="rows" id="all-comment">
                <div className="comment_log colm-4 border" id="defaultCommentBox">
                    <input
                        type="text"
                        name="comment"
                        className="colm-4"
                        id="newComment"
                        placeholder="Write your comment"
                        onChange={handleCommentChange}
                        value={comment}
                        onKeyDown={handleCommentChangeSubmit}
                    />
                    <span className="user">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i> User: Test Mommy
                    </span>
                </div>
            </div>
        </main>
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