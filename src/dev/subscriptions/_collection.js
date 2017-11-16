import {setAlarmState, ALARM_STATE} from "../actions/_collection"

const alarmStateSubsciber = (state, dispatch) => {
    debugger;
    if( state.alarm.time &&
        state.alarm.state === ALARM_STATE.WAITING && 
        state.time.isAfter(state.alarm.time))
        dispatch(setAlarmState(ALARM_STATE.ON))
    else if (state.alarm.snoozeTime &&
             state.alarm.state === ALARM_STATE.SNOOZED &&
             state.time.isAfter(state.alarm.snoozeTime))
             dispatch(setAlarmState(ALARM_STATE.ON))
    console.log(state)
}

const subscriptionCollection = [alarmStateSubsciber]

export default subscriptionCollection