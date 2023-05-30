import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import symbol from "@/components/forum/logo.jpg";
import "./update-forum.css";
import {getForumById, getProfileById, searchTopic} from "@/services/HttpClient.tsx";
import {ForumService} from "@/services/ForumService.tsx";
export const UpdateForum = () => {
    const location = useLocation();
    const currentForumId = location.state.forumId;
    return (
        <div>
            <Header />
            <MainComponent currentForumId={currentForumId}/>
            <FontawesomeScript />
        </div>
    );
};

const Form = ({ currentForumId, handleTitleChange, handleContentChange, title, content, username }) => {
    const navigate = useNavigate();
    const handleUpdate = (event) => {
        event.preventDefault();
        console.log('Update Submitted:', title, content);
        ForumService.update(currentForumId, title, content)
            .then((response) => {
                console.log(`Successful update`);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDelete = (event) => {
        event.preventDefault();
        console.log('Update Submitted:', title, content);
        ForumService.delete(currentForumId)
            .then((response) => {
                console.log(`Successful delete`);
                navigate("/forum");
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <form id="query-form">
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
            <div className="colm-4" id="content-section">
                <p>
          <textarea
              name="content"
              id="mt-editor"
              placeholder="Content"
              onChange={handleContentChange}
              value={content}
          />
                </p>
                <span id="user-info">
          <i className="fa fa-user-circle-o" aria-hidden="true" /> User: {username}
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
    );
};

const Comment = ({ handleCommentChange, comment }) => {
    const handleCommentSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Comment posted:', comment);
        }
    };
    return (
        <div id="all-comment">
            <div className="comment_log colm-4 border" id="defaultCommentBox">
                <input
                    type="text"
                    name="comment"
                    className="colm-4"
                    id="newComment"
                    placeholder="Write your comment"
                    onChange={handleCommentChange}
                    value={comment}
                    onKeyDown={handleCommentSubmit}
                />
                <span className="user">
          <i className="fa fa-user-circle-o" aria-hidden="true" /> User: Test Mommy
        </span>
            </div>
        </div>
    );
};

export const MainComponent = ({currentForumId}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState('');

    const populateForumDetails = (currentForumId): void => {
        getForumById(currentForumId)
            .then((response) => {
                setTitle(response.title);
                setContent(response.content);
                setUserId(response.user);
            })
            .catch( (err) => console.log("Error in fetch profile", err));
    };

    const getUsername = (userId): void => {
        getProfileById(userId)
            .then((response) => {
                const theUserName = `${response.first_name} ${response.last_name}`;
                setUsername(theUserName);
            })
            .catch( (err) => console.log("Error in fetch profile", err));
    };

    useEffect(() => {
        populateForumDetails(currentForumId);
    }, [currentForumId]);

    useEffect(() => {
        if (userId > 0)
            getUsername(userId);
    }, [userId]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <main role="main">
            <Form
                currentForumId={currentForumId}
                handleTitleChange={handleTitleChange}
                handleContentChange={handleContentChange}
                title={title}
                content={content}
                username={username}
            />
            <Comment
                handleCommentChange={handleCommentChange}
                comment={comment}
            />
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