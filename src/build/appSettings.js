"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alarmSnooze = exports.alarmMaxTime = exports.alarmSetTime = exports.alarmSoundFile = undefined;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _timeUtils = require("./internal/timeUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alarmSoundFile = exports.alarmSoundFile = "assets/audio/alarm-sound.wav2";
// const alarmSetTime = getNextTime("11:41:00");
// const alarmMaxTime = getNextTime("11:42:00");
// const alarmSnooze = null;

const alarmSetTime = exports.alarmSetTime = (0, _moment2.default)().clone().add(5, "seconds");
const alarmMaxTime = exports.alarmMaxTime = (0, _moment2.default)().clone().add(35, "seconds");
const alarmSnooze = exports.alarmSnooze = undefined;