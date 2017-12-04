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
export const SHOW_WINDOW = "SHOW_WINDOW";
export const HIDE_WINDOW = "HIDE_WINDOW";
export const WINDOWS = {
  SET_ALARM: "SET_ALARM",
};
export const WINDOW_STATE = { VISIBLE: "VISIBLE", HIDDEN: "HIDDEN" };

export const clockTick = () => ({ type: CLOCK_TICK });
export const setAlarmState = state => ({ type: SET_ALARM_STATE, state });
export const setalarmSetTime = (alarmSetTime, maxTime) =>
  ({ type: SET_ALARM_TIME, alarmSetTime, maxTime });
export const snoozeAlarm = (actualTime, snoozeSetTime) =>
  ({ type: SNOOZE_ALARM, snoozeSetTime, actualTime });

export const showSetAlarmWindow = () => ({ type: SHOW_WINDOW, window: WINDOWS.SET_ALARM });
export const hideSetAlarmWindow = () => ({ type: HIDE_WINDOW, window: WINDOWS.SET_ALARM });
