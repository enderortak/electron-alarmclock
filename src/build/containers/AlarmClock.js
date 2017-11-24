"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRedux = require("react-redux");

var _collection = require("../actions/_collection");

var _AlarmClock = require("../components/AlarmClock");

var _AlarmClock2 = _interopRequireDefault(_AlarmClock);

var _appSettings = require("../appSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alarmSetTimeDisplay = state => {
  if (state.alarm.alarmSetTime) {
    switch (state.alarm.state) {
      case _collection.ALARM_STATE.OFF:
        return "Alarm turned off";
      case _collection.ALARM_STATE.ON:
        return "Wake up!!!";
      case _collection.ALARM_STATE.WAITING:
        return `Alarm time: ${state.alarm.alarmSetTime.format("HH:mm:ss")}`;
      case _collection.ALARM_STATE.SNOOZED:
        return `Alarm time: ${state.alarm.alarmSetTime.format("HH:mm:ss")}, Snoozed until: ${state.alarm.snoozeSetTime.format("HH:mm:ss")}`;
      default:
        return "";
    }
  } else return "Alarm not set";
};

const mapStateToProps = state => ({
  timeDisplay: state.time.format("HH:mm:ss"),
  alarmSetTimeDisplay: alarmSetTimeDisplay(state),
  alarmState: state.alarm.state,
  alarmSoundFile: _appSettings.alarmSoundFile
});

const mapDispatchToProps = dispatch => {
  let intervalId;
  dispatch((0, _collection.setalarmSetTime)(_appSettings.alarmSetTime, _appSettings.alarmMaxTime));
  return {
    clockStart: () => {
      intervalId = setInterval(() => {
        dispatch((0, _collection.clockTick)());
      }, 100);
    },
    clockStop: () => {
      clearInterval(intervalId);
    },
    // snoozeAlarm: () => { dispatch(snoozeAlarm(moment().add(5, "minutes"))); }
    snoozeAlarm: () => {
      dispatch((0, _collection.snoozeAlarm)((0, _moment2.default)(), _appSettings.alarmSnooze ? (0, _moment2.default)().clone().add(_appSettings.alarmSnooze, "minutes") : null));
    }
  };
};

const ClockContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_AlarmClock2.default);

exports.default = ClockContainer;