import { SET_ALARM_STATE, SET_ALARM_TIME, SNOOZE_ALARM, ALARM_STATE } from "../actions/_collection";
import { calculateSnoozeZone, calculateSnoozeTimeSpan } from "../internal/adaptiveSnoozeCalculator";

const alamInitState = {
  active: false,
  alarmSetTime: null,
  maxTime: null,
  snoozeSetTime: null,
  state: ALARM_STATE.OFF,
  snoozes: [],
};


const alarm = (state = alamInitState, action) => {
  switch (action.type) {
    case SET_ALARM_TIME:
      return {
        state: ALARM_STATE.WAITING,
        active: true,
        alarmSetTime: action.alarmSetTime,
        maxTime: action.maxTime,
        snoozes: [],
      };
    case SET_ALARM_STATE:
      return {
        ...state,
        state: action.state,
      };
    case SNOOZE_ALARM: {
      const snoozeRange = state.maxTime.diff(state.alarmSetTime); // snooze timespan varying range
      const snoozeZoneLevel = 5; // number of variations for snooze timespan
      const snoozeRangeDenominator = 3; // denominator to determine maximum snooze timespan
      const snoozeZone =
            calculateSnoozeZone(state.alarmSetTime, snoozeRange, snoozeZoneLevel, action.actualTime);
      const snoozeTimeSpan =
            calculateSnoozeTimeSpan(snoozeRange, snoozeRangeDenominator, snoozeZone);

      return {
        ...state,
        state: ALARM_STATE.SNOOZED,
        snoozeSetTime: action.snoozeSetTime ?
          action.snoozeSetTime : action.actualTime.clone().add(snoozeTimeSpan),
        snoozeLevel: action.snoozeSetTime ? 0 : snoozeZone,
        snoozeTimeSpan: action.snoozeSetTime ?
          action.snoozeSetTime.diff(action.actualTime) : snoozeTimeSpan,
        snoozes: [...state.snoozes,
          {
            snoozeTime: action.actualTime,
            snoozeSetTime: action.snoozeSetTime ?
              action.snoozeSetTime : action.actualTime.clone().add(snoozeTimeSpan),
          },
        ],
      };
    }
    default: return state;
  }
};


export default alarm;
