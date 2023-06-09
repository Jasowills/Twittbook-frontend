import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from "../actionTypes";

const initialState = {
  posts: [],
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: null,
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        error: "Error fetching posts",
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        error: null,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload || "Could not create post. Please try again.",
      };
    default:
      return state;
  }
};

export default postReducer;
