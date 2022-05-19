import { combineReducers } from "redux";
import commentReducer from "./commentReducer";
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    userReducer: userReducer,
    messageReducer: messageReducer,
    postReducer: postReducer,
    commentReducer: commentReducer,
});

export default reducers;