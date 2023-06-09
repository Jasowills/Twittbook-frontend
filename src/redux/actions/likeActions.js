import { LIKE_SUCCESS, LIKE_FAILURE, UNLIKE_SUCCESS, UNLIKE_FAILURE } from "../actionTypes";

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const response = await fetch("https://pink-lovely-hen.cyclic.app//like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });

    if (response.ok) {
      const responseData = await response.json();
      dispatch({
        type: LIKE_SUCCESS,
        payload: responseData.likeId,
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: LIKE_FAILURE,
        payload: errorData.message || "Could not like the post. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: LIKE_FAILURE,
      payload: "Could not like the post. Please try again.",
    });
  }
};

export const unlikePost = (likeId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://pink-lovely-hen.cyclic.app/like/${likeId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      dispatch({
        type: UNLIKE_SUCCESS,
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: UNLIKE_FAILURE,
        payload: errorData.message || "Could not unlike the post. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: UNLIKE_FAILURE,
      payload: "Could not unlike the post. Please try again.",
    });
  }
};
