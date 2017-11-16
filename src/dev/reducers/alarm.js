import { SET_ALARM_STATE, SET_ALARM_TIME, SNOOZE_ALARM, ALARM_STATE} from "../actions/_collection"
import moment from "moment"

const alamInitState = {
    active: false,
    time: null,
    maxTime: null,
    snoozeTime: null,
    state: ALARM_STATE.OFF,
    snoozes: []
}


const alarm = (state = alamInitState, action) => {
    switch (action.type){
        case SET_ALARM_TIME: 
            return {
                state: ALARM_STATE.WAITING, 
                active: true, 
                time: action.time,
                maxTime: action.maxTime,
                snoozes: []
            }
        case SET_ALARM_STATE: 
            return {
                ...state, 
                state: action.state
            }
        case SNOOZE_ALARM: 
            return {
                ...state, 
                state: ALARM_STATE.SNOOZED, 
                snoozeTime: action.time ? action.time : moment().add(calculateSnoozeTimeRange(state.time, state.maxTime, 3, 5)),
                snoozeLevel: action.time ? 0 : calculateSnoozeZone(state.time, state.maxTime, 5),
                snoozeTimeSpan: action.time ? action.time.diff(moment()) : calculateSnoozeTimeRange(state.time, state.maxTime, 3, 5),
                snoozes: [...state.snoozes, 
                            {
                                snoozeTime: moment(),
                                snoozeSetTime: action.time
                            }
                        ]
            }
        default: return state
    }
}


const calculateSnoozeTimeRange = (alarmTime, maxTime, numberOfLevels, denominator, actualTime) => {
    let snoozeChangeRange = maxTime.diff(alarmTime),
    time = actualTime ? actualTime : moment(),
    adaptiveSnoozeTimeRange = snoozeChangeRange / denominator,
    zone = calculateSnoozeZone(alarmTime, maxTime, time, numberOfLevels);
    return adaptiveSnoozeTimeRange / zone;
}
const calculateSnoozeZone = (alarmTime, maxTime, numberOfLevels, actualTime) => {
    let snoozeChangeRange = maxTime.diff(alarmTime),
        level=1,
        time = actualTime ? actualTime : moment();
    alarmTime.add(snoozeChangeRange/numberOfLevels);
    while(level < numberOfLevels && time.isAfter(alarmTime)){
        level++;
        alarmTime.add(snoozeChangeRange/numberOfLevels);
    }
    return level;
}
export default alarm;