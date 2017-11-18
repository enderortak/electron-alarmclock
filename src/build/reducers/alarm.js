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
  time: null,
  maxTime: null,
  snoozeTime: null,
  state: _collection.ALARM_STATE.OFF,
  snoozes: []
};

const alarm = (state = alamInitState, action) => {
  switch (action.type) {
    case _collection.SET_ALARM_TIME:
      return {
        state: _collection.ALARM_STATE.WAITING,
        active: true,
        time: action.time,
        maxTime: action.maxTime,
        snoozes: []
      };
    case _collection.SET_ALARM_STATE:
      return _extends({}, state, {
        state: action.state
      });
    case _collection.SNOOZE_ALARM:
      {
        const snoozeRange = state.maxTime.diff(state.time); // snooze timespan varying range
        const snoozeZoneLevel = 5; // number of variations for snooze timespan
        const snoozeRangeDenominator = 3; // denominator to determine maximum snooze timespan
        const snoozeZone = (0, _adaptiveSnoozeCalculator.calculateSnoozeZone)(state.time, snoozeRange, snoozeZoneLevel, (0, _moment2.default)());
        const snoozeTimeSpan = (0, _adaptiveSnoozeCalculator.calculateSnoozeTimeSpan)(state.time, snoozeRangeDenominator, snoozeZone);

        return _extends({}, state, {
          state: _collection.ALARM_STATE.SNOOZED,
          snoozeTime: action.time ? action.time : (0, _moment2.default)().add(snoozeTimeSpan),
          snoozeLevel: action.time ? 0 : snoozeZone,
          snoozeTimeSpan: action.time ? action.time.diff((0, _moment2.default)()) : snoozeTimeSpan,
          snoozes: [...state.snoozes, {
            snoozeTime: (0, _moment2.default)(),
            snoozeSetTime: action.time
          }]
        });
      }
    default:
      return state;
  }
};

exports.default = alarm;