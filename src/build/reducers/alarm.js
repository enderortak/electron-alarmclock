"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _collection = require("../actions/_collection");

var _adaptiveSnoozeCalculator = require("../internal/adaptiveSnoozeCalculator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alamInitState = {
  active: false,
  alarmSetTime: null,
  maxTime: null,
  snoozeSetTime: null,
  state: _collection.ALARM_STATE.OFF,
  snoozes: []
};

const alarm = (state = alamInitState, action) => {
  switch (action.type) {
    case _collection.SET_ALARM_TIME:
      return {
        state: _collection.ALARM_STATE.WAITING,
        active: true,
        alarmSetTime: action.alarmSetTime,
        maxTime: action.maxTime,
        snoozes: []
      };
    case _collection.SET_ALARM_STATE:
      return _extends({}, state, {
        state: action.state
      });
    case _collection.SNOOZE_ALARM:
      {
        const snoozeRange = state.maxTime.diff(state.alarmSetTime); // snooze timespan varying range
        const snoozeZoneLevel = 5; // number of variations for snooze timespan
        const snoozeRangeDenominator = 3; // denominator to determine maximum snooze timespan
        const snoozeZone = (0, _adaptiveSnoozeCalculator.calculateSnoozeZone)(state.alarmSetTime, snoozeRange, snoozeZoneLevel, action.actualTime);
        const snoozeTimeSpan = (0, _adaptiveSnoozeCalculator.calculateSnoozeTimeSpan)(snoozeRange, snoozeRangeDenominator, snoozeZone);

        return _extends({}, state, {
          state: _collection.ALARM_STATE.SNOOZED,
          snoozeSetTime: action.snoozeSetTime ? action.snoozeSetTime : action.actualTime.clone().add(snoozeTimeSpan),
          snoozeLevel: action.snoozeSetTime ? 0 : snoozeZone,
          snoozeTimeSpan: action.snoozeSetTime ? action.snoozeSetTime.diff(action.actualTime) : snoozeTimeSpan,
          snoozes: [...state.snoozes, {
            snoozeTime: action.actualTime,
            snoozeSetTime: action.snoozeSetTime ? action.snoozeSetTime : action.actualTime.clone().add(snoozeTimeSpan)
          }]
        });
      }
    default:
      return state;
  }
};

exports.default = alarm;