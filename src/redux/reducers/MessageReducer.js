import {
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../actionTypes";

const initialState = {
  messages: [],
  user: null,
  error: null,
  selectedUser: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        error: null,
      };
    case FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
