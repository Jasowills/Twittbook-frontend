import {
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_SUCCESS,
  UNLIKE_FAILURE,
} from "../actionTypes";

const initialState = {
  likeId: null,
  error: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_SUCCESS:
      return {
        ...state,
        likeId: action.payload._id,
        error: null,
      };
    case LIKE_FAILURE:
      return {
        ...state,
        likeId: null,
        error: action.payload,
      };
    case UNLIKE_SUCCESS:
      return {
        ...state,
        likeId: null,
        error: null,
      };
    case UNLIKE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likeReducer;
