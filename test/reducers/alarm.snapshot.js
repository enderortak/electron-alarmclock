import moment from "moment";
import {
  SET_ALARM_STATE, SET_ALARM_TIME, SNOOZE_ALARM, ALARM_STATE,
} from "../../src/js/actions/_collection";


const actualTime = moment("2017-01-01 08:28:00");

const snapshots = [
  {
    description: "should set alarm time",
    action: {
      type: SET_ALARM_TIME,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
    },
    oldState: {
      state: null,
      active: false,
      alarmSetTime: null,
      maxTime: null,
      snoozes: null,
    },
    newState: {
      state: ALARM_STATE.WAITING,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
  },
  {
    description: "should set alarm state to ALARM_STATE.WAITING",
    action: {
      type: SET_ALARM_STATE,
      state: ALARM_STATE.WAITING,
    },
    oldState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.WAITING,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
  },
  {
    description: "should set alarm state to ALARM_STATE.ON",
    action: {
      type: SET_ALARM_STATE,
      state: ALARM_STATE.ON,
    },
    oldState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.ON,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
  },
  {
    description: "should set alarm state to ALARM_STATE.SNOOZED",
    action: {
      type: SET_ALARM_STATE,
      state: ALARM_STATE.SNOOZED,
    },
    oldState: {
      state: ALARM_STATE.ON,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
  },
  {
    description: "should set alarm state to ALARM_STATE.OFF",
    action: {
      type: SET_ALARM_STATE,
      state: ALARM_STATE.OFF,
    },
    oldState: {
      state: ALARM_STATE.ON,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.OFF,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },

  },
  {
    description: "should snooze alarm (static)",
    action: {
      type: SNOOZE_ALARM,
      snoozeSetTime: moment("2017-01-01 08:30:00"),
      actualTime,
    },
    oldState: {
      state: ALARM_STATE.ON,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozeSetTime: moment("2017-01-01 08:30:00"),
      snoozeTimeSpan: moment("2017-01-01 08:30:00").diff(actualTime),
      snoozes: [{
        snoozeTime: actualTime,
        snoozeSetTime: moment("2017-01-01 08:30:00"),
      }],
    },
  },
  {
    description: "should snooze alarm (dynamic)",
    action: {
      type: SNOOZE_ALARM,
      actualTime,
    },
    oldState: {
      state: ALARM_STATE.ON,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      alarmSetTime: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozeSetTime: actualTime.clone().add(2, "minutes"),
      snoozeTimeSpan: actualTime.clone().add(2, "minutes").diff(actualTime),
      snoozes: [{
        snoozeTime: actualTime,
        snoozeSetTime: actualTime.clone().add(2, "minutes"),
      }],
    },

  },
];

exports.snapshots = snapshots;
