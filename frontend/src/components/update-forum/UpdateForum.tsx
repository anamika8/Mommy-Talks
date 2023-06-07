import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useUser } from '@/components/UserContext.tsx';
import symbol from "@/components/forum/logo.jpg";
import "./update-forum.css";
import {getForumById, getProfileById} from "@/services/HttpClient.tsx";
import {getForumComments} from "@/services/CommentsClient.tsx";
import {ForumService} from "@/services/ForumService.tsx";
import {CommentService} from "@/services/CommentService.tsx";
import {CommentType} from "@/ProfileTypes.ts";
export const UpdateForum = () => {
    const location = useLocation();
    const currentForumId = location.state.forumId;
    return (
        <div>
            <Header />
            <MainComponent currentForumId={currentForumId}/>
            <Footer />
            <FontawesomeScript />
        </div>
    );
};

const Form = ({ currentForumId, handleTitleChange, handleContentChange, title, content, username, userId, currentUserId }) => {
    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log('Update Submitted:', title, content);
        ForumService.update(currentForumId, title, content)
            .then((response) => {
                console.log(`Successful update`);
                navigate("/forum");
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
    const isDisabled = userId !== currentUserId;

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
                    disabled={isDisabled}
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
              disabled={isDisabled}
          />
                </p>
                <span id="user-info">
          <i className="fa fa-user-circle-o" aria-hidden="true" /> User: {username}
        </span>
            </div>
            <br />
            <div id="outer">
                <div className="inner">
                    <button type="button" name="submit" id="updatePost" onClick={handleUpdate} className={`${isDisabled ? 'inactiveLink' : ''}`}>
                        Update
                    </button>
                </div>
                <div className="inner">
                    <button type="button" name="submit" id="deletePost" onClick={handleDelete} className={`${isDisabled ? 'inactiveLink' : ''}`}>
                        Delete
                    </button>
                </div>
            </div>
        </form>
    );
};

const Comment = ({ comment, userId }) => {
    const [commenter, setCommenter] = useState('');
    const getCommenter = (userId): void => {
        getProfileById(userId, null)
            .then((response) => {
                const theUserName = `${response.first_name} ${response.last_name}`;
                setCommenter(theUserName);
            })
            .catch( (err) => console.log("Error in fetch profile", err));
    };
    useEffect(() => {
        getCommenter(userId);
    }, [userId]);
    return (
            <div className="comment_log colm-4 border">
                <input
                    type="text"
                    name="comment"
                    className="colm-4"
                    value={comment}
                    disabled
                />
                <span className="user">
          <i className="fa fa-user-circle-o" aria-hidden="true" /> User: {commenter}
        </span>
            </div>
    );
};

const NewComment = ({ username, forumId }) => {
    const currentUserEmail = localStorage.getItem('email');
    const navigate = useNavigate();
    const handleCommentSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newComment = event.target.value;
            CommentService.send(currentUserEmail, forumId.toString(), newComment)
                .then((response) => {
                    navigate('/forum');
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };
    return (
        <div id="new-comment">
            <div className="comment_log colm-4 border" id="newCommentBox">
                <input
                    type="text"
                    name="comment"
                    className="colm-4"
                    id="newComment"
                    placeholder="Write your comment"
                    onKeyDown={handleCommentSubmit}
                />
                <span className="user">
          <i className="fa fa-user-circle-o" aria-hidden="true" /> User: {username}
        </span>
            </div>
        </div>
    );
};

export const MainComponent = ({currentForumId}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState<CommentType[]>([]);
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState('');
    const [currentUserId, setCurrentUserId] = useState(0);
    const [currentUsername, setCurrentUsername] = useState('');
    const { userRecord } = useUser();
    const getCurrentUserId = (uuid): void => {
        getProfileById(null, uuid)
            .then((response) => {
                setCurrentUserId(response.id);
                getLoggedInUsername(response.id);
            })
            .catch( (err) => console.log("Error in fetch profile", err));
    };

    const populateForumDetails = (currentForumId): void => {
        getForumById(currentForumId)
            .then((response) => {
                setTitle(response.title);
                setContent(response.content);
                setUserId(response.user);
            })
            .catch( (err) => console.log("Error in fetch forum", err));
    };

    const populateComments = (currentForumId): void => {
        getForumComments(currentForumId)
            .then((response) => {
                console.log("Found comments - ", response.length);
                setComments(response);
            })
            .catch( (err) => console.log("Error in fetch comments", err));
    };

    const getUsername = (userId): void => {
        getProfileById(userId, null)
            .then((response) => {
                const theUserName = `${response.first_name} ${response.last_name}`;
                setUsername(theUserName);
            })
            .catch( (err) => console.log("Error in fetch profile", err));
    };

    const getLoggedInUsername = (userId): void => {
        getProfileById(userId, null)
            .then((response) => {
                const theUserName = `${response.first_name} ${response.last_name}`;
                setCurrentUsername(theUserName);
            })
            .catch( (err) => console.log("Error in fetch profile", err));
    };

    useEffect(() => {
        populateForumDetails(currentForumId);
        populateComments(currentForumId);
        getCurrentUserId(userRecord.uid);
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

    return (
        <main role="main">
            <Form
                currentForumId={currentForumId}
                handleTitleChange={handleTitleChange}
                handleContentChange={handleContentChange}
                title={title}
                content={content}
                username={username}
                userId={userId}
                currentUserId={currentUserId}
            />
            <div id="all-comment">
                {comments.length > 0 ? (
                    comments.map((eachComment, index) => (
                        <Comment key={index} comment={eachComment.comment} userId={eachComment.user}/>
                    ))
                ) : (
                    <p></p>
                )}

            <NewComment
                username={currentUsername}
                forumId={currentForumId}
            />
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

export const Footer = () => {
    return (
        <footer role="contentinfo" className="footerForum">
            © 2023 created by Anamika
        </footer>
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