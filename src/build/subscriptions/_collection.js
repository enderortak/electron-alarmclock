"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collection = require("../actions/_collection");

const alarmStateSubsciber = (state, dispatch) => {
  const shouldSetAlarmOn = state.alarm.alarmSetTime && state.alarm.state === _collection.ALARM_STATE.WAITING && state.time.isAfter(state.alarm.alarmSetTime) || state.alarm.snoozeSetTime && state.alarm.state === _collection.ALARM_STATE.SNOOZED && state.time.isAfter(state.alarm.snoozeSetTime);

  if (shouldSetAlarmOn) dispatch((0, _collection.setAlarmState)(_collection.ALARM_STATE.ON));
};

const subscriptionCollection = [alarmStateSubsciber];

exports.default = subscriptionCollection;