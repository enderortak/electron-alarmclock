import moment from "moment";
import { CLOCK_TICK } from "../actions/_collection";

const time = (state = moment(), action) => (action.type === CLOCK_TICK ? moment() : state);

export default time;

