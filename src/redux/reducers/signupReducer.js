import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_SIGNUP_FORM,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  firstName: "",
  username: "",
  email: "",
  lastName: "",
  followers: "",
  userId: "",
  profilePicture: null, // Add profilePicture property to the initial state
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      // Retrieve the stored user data from localStorage
      const userData = JSON.parse(localStorage.getItem("userData"));

      return {
        ...state,
        isLoading: false,
        firstName: userData.user.firstName,
        username: userData.user.username,
        email: userData.user.email,
        lastName: userData.user.lastName,
        followers: userData.user.followers,
        userId: userData.user._id,
        profilePicture: userData.user.profilePicture, // Update profilePicture property in the state
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case RESET_SIGNUP_FORM:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default signupReducer;
