import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
} from "../actionTypes";

export const addComment = (userId, commentData) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://pink-lovely-hen.cyclic.app/comments/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: responseData.comment,
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: ADD_COMMENT_FAILURE,
        payload:
          errorData.message || "Failed to add comment. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_COMMENT_FAILURE,
      payload: "Failed to add comment. Please try again.",
    });
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://pink-lovely-hen.cyclic.app/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      dispatch({
        type: DELETE_COMMENT_SUCCESS,
        payload: commentId,
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: DELETE_COMMENT_FAILURE,
        payload:
          errorData.message || "Failed to delete comment. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      payload: "Failed to delete comment. Please try again.",
    });
  }
};

export const getCommentsByPostId = (postId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://pink-lovely-hen.cyclic.app/posts/${postId}/comments`
    );

    if (response.ok) {
      const responseData = await response.json();
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: [responseData], // Wrap responseData in an array
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: GET_COMMENTS_FAILURE,
        payload:
          errorData.message || "Failed to get comments. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: "Failed to get comments. Please try again.",
    });
  }
};