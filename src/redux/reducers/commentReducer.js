// commentReducer.js

import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
} from "../actionTypes";

const initialState = {
  comments: [],
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        error: null,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload, // Update payload value
        error: null,
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
        error: null,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
        error: null,
      };
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
