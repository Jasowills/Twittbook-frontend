import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_LOGIN_FORM,
  LOGOUT,
} from "../actionTypes";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  firstname: "",
  username: "",
  email: "",
  lastname: "",
  followers: "",
  isFollowing: "",
  token: "",
  isVerified: false,
  profilePicture: null,
  userId: "",
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      const userData = action.payload;

      // Set the userData as a cookie
      Cookies.set("userData", userData);

      return {
        ...state,
        isLoading: false,
        firstname: userData.user.firstName,
        username: userData.user.username,
        email: userData.user.email,
        lastname: userData.user.lastName,
        followers: userData.user.followers,
        isFollowing: userData.user.isFollowing,
        profilePicture: userData.user.profilePicture,
        isVerified: userData.user.isVerified,
        token: userData.user.token,
        userId: userData.user._id,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case RESET_LOGIN_FORM:
      return {
        ...state,
        error: null,
      };
    case LOGOUT:
      // Clear the userData cookie
      Cookies.remove("userData");

      // Reset the state to the initial state
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
