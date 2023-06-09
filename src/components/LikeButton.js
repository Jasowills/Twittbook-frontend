import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/likeActions";

function LikeButton({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const dispatch = useDispatch();

  const handleLike = () => {
    const { _id: postId, userId } = post;

    dispatch(likePost(postId, userId))
      .then((data) => {
        if (data.like && data.like._id) {
          // Like action succeeded, save the likeId
          setLiked(true);
          setLikeId(data.like._id);
          console.log("Post liked");
        } else {
          // Like action failed
          console.log("Failed to like the post");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUnlike = () => {
    if (!likeId) {
      console.log("No likeId found");
      return;
    }

    dispatch(unlikePost(likeId))
      .then(() => {
        // Unlike action succeeded
        setLiked(false);
        setLikeId(null);
        console.log("Post unliked");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span className="like">
      {liked ? (
        <FontAwesomeIcon
          icon={faHeart}
          className="dislike"
          onClick={handleUnlike}
        />
      ) : (
        <FontAwesomeIcon icon={faHeart} className="like" onClick={handleLike} />
      )}
      &nbsp;({post.likes})&nbsp;
    </span>
  );
}

export default LikeButton;
