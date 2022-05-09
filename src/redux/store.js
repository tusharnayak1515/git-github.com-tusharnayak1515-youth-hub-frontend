import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const store = configureStore({reducer: reducers}, {}, applyMiddleware(thunk));

export default store;