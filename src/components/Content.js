import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Home.css";
import profilePic from "../images/profile.png";
import PostComponent from "../components/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faImagePortrait,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { createPost } from "../redux/actions/postActions";

function Content() {
  const dispatch = useDispatch();
  const profilePicture = useSelector((state) => state.login.profilePicture);
  const userProfilePic = profilePicture || profilePic;
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [showImage, setShowImage] = useState(false); // State variable to track if the image is displayed
  const [isPosting, setIsPosting] = useState(false); // State variable to track if the post is being submitted
  const userId = useSelector((state) => state.login.userId);
  const inputFileRef = useRef(null);

  const tagshow = () => {
    const tags = document.getElementsByClassName("tag");
    // Loop through the collection of elements and set the style for each tag
    for (let i = 0; i < tags.length; i++) {
      tags[i].style.display = "block";
    }
  };

  const tagshow1 = () => {
    const tags = document.getElementsByClassName("tag");
    // Loop through the collection of elements and set the style for each tag
    for (let i = 0; i < tags.length; i++) {
      tags[i].style.display = "none";
    }
    inputFileRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Convert the image to a string
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      setPostImage(imageData);
      setShowImage(true); // Set showImage to true to display the image
    };
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const postData = {
      userId,
      content: postContent,
      image: postImage,
      // Add any other data you want to send to the server
    };

    setIsPosting(true); // Set isPosting to true to indicate the post is being submitted
    dispatch(createPost(userId, postData))
      .then(() => {
        setPostContent("");
        setPostImage("");
        setShowImage(false); // Clear the input and hide the image after submitting the post
        setIsPosting(false); // Reset isPosting after the post is submitted
      })
      .catch((error) => {
        console.log("Error creating post:", error);
        setIsPosting(false); // Reset isPosting if there was an error
      });
  };

  const handleCloseImage = () => {
    setPostImage("");
    setShowImage(false); // Close the image by clearing the input and hiding the image
  };

  return (
    <div className="content">
      <form className="greetings" onSubmit={handlePostSubmit}>
        <div className="drive">
          <div className="profile-picture-container">
            <img src={userProfilePic} alt="profile" className="profile-pic" />
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <input
            type="text"
            required
            onClick={tagshow}
            placeholder="What's happening?"
            className="create-post"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" className="post" disabled={isPosting}>
            {isPosting ? (
              <FontAwesomeIcon icon={faSpinner} className="spinner-icon" spin />
            ) : (
              "Post"
            )}
          </button>
        </div>
        <div className="tag" onClick={tagshow1} title="Image">
          <FontAwesomeIcon icon={faImage} className="image-icon" />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={inputFileRef}
            onChange={handleImageChange}
          />
        </div>
        {showImage && (
          <div className="post-image-container">
            <img
              className="post-image center1"
              src={postImage}
              alt="Selected"
            />
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={handleCloseImage}
            />
          </div>
        )}
      </form>
      <PostComponent />
    </div>
  );
}

export default Content;
