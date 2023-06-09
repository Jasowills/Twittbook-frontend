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
import { Resizer } from "react-image-file-resizer";

function Content() {
  const dispatch = useDispatch();
  const profilePicture = useSelector((state) => state.login.profilePicture);
  const userProfilePic = profilePicture || profilePic;
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const userId = useSelector((state) => state.login.userId);
  const inputFileRef = useRef(null);

  const tagshow = () => {
    const tags = document.getElementsByClassName("tag");
    for (let i = 0; i < tags.length; i++) {
      tags[i].style.display = "block";
    }
  };

  const tagshow1 = () => {
    const tags = document.getElementsByClassName("tag");
    for (let i = 0; i < tags.length; i++) {
      tags[i].style.display = "none";
    }
    inputFileRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImageData = canvas.toDataURL("image/jpeg", 0.8);
        setPostImage(compressedImageData);
        setShowImage(true);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const postData = {
      userId,
      content: postContent,
      image: postImage,
    };

    setIsPosting(true);
    dispatch(createPost(userId, postData))
      .then(() => {
        setPostContent("");
        setPostImage("");
        setShowImage(false);
        setIsPosting(false);
      })
      .catch((error) => {
        console.log("Error creating post:", error);
        setIsPosting(false);
      });
  };

  const handleCloseImage = () => {
    setPostImage("");
    setShowImage(false);
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
