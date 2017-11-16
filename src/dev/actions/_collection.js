export const CLOCK_TICK = "CLOCK_TICK"
export const SET_ALARM_STATE = "SET_ALARM_STATE"
export const SET_ALARM_TIME = "SET_ALARM_TIME"
export const SNOOZE_ALARM = "SNOOZE_ALARM"
export const ALARM_STATE = {
    WAITING: "WAITING",
    ON: "ON",
    OFF: "OFF",
    SNOOZED: "SNOOZED"
}

export const clockTick = () => ({type: CLOCK_TICK})
export const setAlarmState = state => ({type: SET_ALARM_STATE, state})
export const setAlarmTime = (time, maxTime) => ({type: SET_ALARM_TIME, time, maxTime})
export const snoozeAlarm = time => ({type: SNOOZE_ALARM, time})
