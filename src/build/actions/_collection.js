"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const CLOCK_TICK = exports.CLOCK_TICK = "CLOCK_TICK";
const SET_ALARM_STATE = exports.SET_ALARM_STATE = "SET_ALARM_STATE";
const SET_ALARM_TIME = exports.SET_ALARM_TIME = "SET_ALARM_TIME";
const SNOOZE_ALARM = exports.SNOOZE_ALARM = "SNOOZE_ALARM";
const ALARM_STATE = exports.ALARM_STATE = {
  WAITING: "WAITING",
  ON: "ON",
  OFF: "OFF",
  SNOOZED: "SNOOZED"
};

const clockTick = exports.clockTick = () => ({ type: CLOCK_TICK });
const setAlarmState = exports.setAlarmState = state => ({ type: SET_ALARM_STATE, state });
const setalarmSetTime = exports.setalarmSetTime = (alarmSetTime, maxTime) => ({ type: SET_ALARM_TIME, alarmSetTime, maxTime });
const snoozeAlarm = exports.snoozeAlarm = (actualTime, snoozeSetTime) => ({ type: SNOOZE_ALARM, snoozeSetTime, actualTime });