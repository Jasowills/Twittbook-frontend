import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import postReducer from "./postReducer";
import likeReducer from "./likereducer";
import commentReducer from "./commentReducer";
import messageReducer from "./MessageReducer";
// Define your root reducer
const rootReducer = combineReducers({
  login: loginReducer,
  post: postReducer,
  signup: signupReducer,
  like: likeReducer,
  comment: commentReducer,
  message: messageReducer
});

export default rootReducer;
