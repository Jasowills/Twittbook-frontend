import { GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from "../actionTypes";
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from "../actionTypes";

export const getPosts = () => async (dispatch) => {
  const baseURL = "https://twittbook-backend.onrender.com/posts";
  const pollingInterval = 1; // 1 minute

  const pollPosts = async () => {
    try {
      const pollingURL = `${baseURL}?poll=${pollingInterval}`;
      const response = await fetch(pollingURL);
      const data = await response.json();

      // Sort the posts by createdAt in descending order
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: sortedPosts,
      });

      // Call the pollPosts function again to continue polling
      pollPosts();
    } catch (error) {
      console.error(error);
      dispatch({ type: GET_POSTS_FAILURE });
    }
  };

  pollPosts();
};

export const createPost = (userId, postData) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://twittbook-backend.onrender.com/posts/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (response.ok) {
      const createdPost = await response.json();

      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: createdPost,
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: CREATE_POST_FAILURE,
        payload:
          errorData.message || "Could not create post. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: CREATE_POST_FAILURE });
  }
};
