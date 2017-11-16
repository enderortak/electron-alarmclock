import { combineReducers } from "redux";
import time from "./time";
import alarm from "./alarm";

const reducerCollection = combineReducers({
  time, alarm,
});

export default reducerCollection;
