import moment from "moment";
import { SET_ALARM_STATE, SET_ALARM_TIME, SNOOZE_ALARM, ALARM_STATE } from "../actions/_collection";
import { calculateSnoozeZone, calculateSnoozeTimeRange } from "../internal/adaptiveSnoozeCalculator";

const alamInitState = {
  active: false,
  time: null,
  maxTime: null,
  snoozeTime: null,
  state: ALARM_STATE.OFF,
  snoozes: [],
};


const alarm = (state = alamInitState, action) => {
  switch (action.type) {
    case SET_ALARM_TIME:
      return {
        state: ALARM_STATE.WAITING,
        active: true,
        time: action.time,
        maxTime: action.maxTime,
        snoozes: [],
      };
    case SET_ALARM_STATE:
      return {
        ...state,
        state: action.state,
      };
    case SNOOZE_ALARM: {
      const snoozeTimeRange = calculateSnoozeTimeRange(state.time, state.maxTime, 3, 5, moment());
      const snoozeZone = calculateSnoozeZone(state.time, state.maxTime, 5);
      return {
        ...state,
        state: ALARM_STATE.SNOOZED,
        snoozeTime: action.time ? action.time : moment().add(snoozeTimeRange),
        snoozeLevel: action.time ? 0 : snoozeZone,
        snoozeTimeSpan: action.time ? action.time.diff(moment()) : snoozeTimeRange,
        snoozes: [...state.snoozes,
          {
            snoozeTime: moment(),
            snoozeSetTime: action.time,
          },
        ],
      };
    }
    default: return state;
  }
};


export default alarm;
