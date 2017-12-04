import { WINDOWS, WINDOW_STATE, SHOW_WINDOW, HIDE_WINDOW } from "../actions/_collection";


const initState = {
  [WINDOWS.SET_ALARM]: WINDOW_STATE.HIDDEN,
};
const windowState = (state = initState, action) => {
  switch (action.type) {
    case SHOW_WINDOW: { return { ...state, [action.window]: WINDOW_STATE.VISIBLE }; }
    case HIDE_WINDOW: return { ...state, [action.window]: WINDOW_STATE.HIDDEN };
    default: return state;
  }
};

export default windowState;
