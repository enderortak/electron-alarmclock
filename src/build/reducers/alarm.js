"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _collection = require("../actions/_collection");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

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
            return _extends({}, state, {
                state: _collection.ALARM_STATE.SNOOZED,
                snoozeTime: action.time ? action.time : (0, _moment2.default)().add(calculateSnoozeTimeRange(state.time, state.maxTime, 3, 5)),
                snoozeLevel: action.time ? 0 : calculateSnoozeZone(state.time, state.maxTime, 5),
                snoozeTimeSpan: action.time ? action.time.diff((0, _moment2.default)()) : calculateSnoozeTimeRange(state.time, state.maxTime, 3, 5),
                snoozes: [...state.snoozes, {
                    snoozeTime: (0, _moment2.default)(),
                    snoozeSetTime: action.time
                }]
            });
        default:
            return state;
    }
};

const calculateSnoozeTimeRange = (alarmTime, maxTime, numberOfLevels, denominator, actualTime) => {
    let snoozeChangeRange = maxTime.diff(alarmTime),
        time = actualTime ? actualTime : (0, _moment2.default)(),
        adaptiveSnoozeTimeRange = snoozeChangeRange / denominator,
        zone = calculateSnoozeZone(alarmTime, maxTime, time, numberOfLevels);
    return adaptiveSnoozeTimeRange / zone;
};
const calculateSnoozeZone = (alarmTime, maxTime, numberOfLevels, actualTime) => {
    let snoozeChangeRange = maxTime.diff(alarmTime),
        level = 1,
        time = actualTime ? actualTime : (0, _moment2.default)();
    alarmTime.add(snoozeChangeRange / numberOfLevels);
    while (level < numberOfLevels && time.isAfter(alarmTime)) {
        level++;
        alarmTime.add(snoozeChangeRange / numberOfLevels);
    }
    return level;
};
exports.default = alarm;