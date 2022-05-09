import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    userReducer: userReducer,
    messageReducer: messageReducer,
    postReducer: postReducer
});

export default reducers;