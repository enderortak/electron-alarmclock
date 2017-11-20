const {
  SET_ALARM_STATE, SET_ALARM_TIME, SNOOZE_ALARM, ALARM_STATE,
} = require("../../build/actions/_collection");

const moment = require("moment");

const actualTime = moment();

const snapshots = [
  {
    description: "should set alarm time",
    action: {
      type: SET_ALARM_TIME,
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
    },
    oldState: {
      state: null,
      active: false,
      time: null,
      maxTime: null,
      snoozes: null,
    },
    newState: {
      state: ALARM_STATE.WAITING,
      active: true,
      time: moment("2017-01-01 08:00:00"),
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
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.WAITING,
      active: true,
      time: moment("2017-01-01 08:00:00"),
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
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.ON,
      active: true,
      time: moment("2017-01-01 08:00:00"),
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
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      time: moment("2017-01-01 08:00:00"),
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
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.OFF,
      active: true,
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },

  },
  {
    description: "should snooze alarm (static)",
    action: {
      type: SNOOZE_ALARM,
      time: moment("2017-01-01 08:30:00"),
    },
    oldState: {
      state: ALARM_STATE.ON,
      active: true,
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      time: moment("2017-01-01 08:00:00"),
      maxTime: moment("2017-01-01 08:30:00"),
      snoozeTime: moment("2017-01-01 08:30:00"),
      snoozeTimeSpan: moment("2017-01-01 08:30:00").diff(actualTime),
      snoozes: [{
        snoozeTime: moment(),
        snoozeSetTime: moment("2017-01-01 08:00:00"),
      }],
    },
  },
  {
    description: "should snooze alarm (dynamic)",
    action: {
      type: SNOOZE_ALARM,
    },
    oldState: {
      state: ALARM_STATE.ON,
      active: true,
      time: moment("2017-01-01 07:20:00"),
      maxTime: moment("2017-01-01 07:50:00"),
      snoozes: [],
    },
    newState: {
      state: ALARM_STATE.SNOOZED,
      active: true,
      time: moment("2017-01-01 07:20:00"),
      maxTime: moment("2017-01-01 07:30:00"),
      snoozeTime: moment().add(2, "minutes"),
      snoozeTimeSpan: moment("2017-01-01 08:30:00").diff(moment()),
      snoozes: [{
        snoozeTime: moment(),
        snoozeSetTime: moment().add(2, "minutes"),
      }],
    },

  },
];

exports.snapshots = snapshots;
