export const CLOCK_TICK = "CLOCK_TICK";
export const SET_ALARM_STATE = "SET_ALARM_STATE";
export const SET_ALARM_TIME = "SET_ALARM_TIME";
export const SNOOZE_ALARM = "SNOOZE_ALARM";
export const ALARM_STATE = {
  WAITING: "WAITING",
  ON: "ON",
  OFF: "OFF",
  SNOOZED: "SNOOZED",
};

export const clockTick = () => ({ type: CLOCK_TICK });
export const setAlarmState = state => ({ type: SET_ALARM_STATE, state });
export const setalarmSetTime = (alarmSetTime, maxTime) =>
  ({ type: SET_ALARM_TIME, alarmSetTime, maxTime });
export const snoozeAlarm = (actualTime, snoozeSetTime) =>
  ({ type: SNOOZE_ALARM, snoozeSetTime, actualTime });
