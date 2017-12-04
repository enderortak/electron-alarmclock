import { combineReducers } from "redux";
import time from "./time";
import alarm from "./alarm";
import windowState from "./windowState";

const reducerCollection = combineReducers({
  time, alarm, windowState,
});

export default reducerCollection;
