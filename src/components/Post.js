import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/postActions";
import "../styles/mediaqueries.css";
import {
  getCommentsByPostId,
  addComment,
} from "../redux/actions/commentsActions";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import LikeButton from "./LikeButton";
import VerifiedBadge from "./VerifiedBadge";
import Spinner from "./MySpinner"; // Import the spinner component

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isVerified = useSelector((state) => state.login.isVerified);
  const userId = useSelector((state) => state.login.userId);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);
  const comments = useSelector((state) => state.comment.comments[0]);

  useEffect(() => {
    setIsLoading(true);

    dispatch(getCommentsByPostId(post._id))
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [dispatch, post._id]);

  const handlePostClick = () => {
    dispatch(getCommentsByPostId(post._id));
  };

  const handleCommentIconClick = () => {
    dispatch(getCommentsByPostId(post._id));
  };

  const handleSubmitComment = () => {
    dispatch(
      addComment(userId, {
        content: commentInput,
        postId: post._id,
        userId,
      })
    );
    setCommentInput("");
  };

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const formatTime = (timeString) => {
    const currentTime = new Date();
    const postTime = new Date(timeString);
    const timeDiff = Math.abs(currentTime - postTime);
    const minutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      return `${days}d`;
    }
  };

  // Render the spinner if isLoading is true
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div key={post._id} className="post-container" onClick={handlePostClick}>
      {post.user && post.user.profilePicture && (
        <div className="post-profile">
          <img
            src={post.user.profilePicture}
            className="profile-pic adjust-pic"
            alt="Profile"
          />
        </div>
      )}
      <div className="post-content">
        <div className="post-header">
          <h3 className="post-name">
            {post.user && post.user.username} &nbsp;
           
          </h3>
          <span>{formatTime(post.createdAt)}</span>
        </div>
        <p className="post-text">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post-image" className="post-image" />
        )}
        <div className="post-footer">
          <LikeButton post={post} />
          <p>
            <FontAwesomeIcon
              icon={faComment}
              onClick={handleCommentIconClick}
            />
            &nbsp;({post.comments})
          </p>
        </div>
        {showComments && (
          <div className="comments-container">
            <ul className="comment-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  {comment.user && comment.user.profilePicture && (
                    <img
                      src={comment.user.profilePicture}
                      alt="Profile"
                      className="prof"
                    />
                  )}
                  &nbsp;
                  <div className="comment-content">
                    <p className="comment-username">
                      {comment.user && comment.user.username}{" "}
                      
                    </p>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
        <div className="comment-input-container">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          &nbsp;&nbsp;
          <button
            className="submit"
            onClick={handleSubmitComment}
            disabled={!commentInput}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
        <button className="show-comments-btn" onClick={handleShowComments}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>
    </div>
  );
};

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoadingPosts = useSelector((state) => state.post.isLoadingPosts); // Add a isLoadingPosts state

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Render the spinner if isLoadingPosts is true
  if (isLoadingPosts) {
    return <Spinner />;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
