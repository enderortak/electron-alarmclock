"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRedux = require("react-redux");

var _collection = require("../actions/_collection");

var _Clock = require("../components/Clock");

var _Clock2 = _interopRequireDefault(_Clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alarmSetTime = (0, _moment2.default)("2017-11-23").add(7, "hours").add(15, "minutes");
const alarmMaxTime = (0, _moment2.default)("2017-11-23").add(7, "hours").add(45, "minutes");
const alarmSnooze = null;

// const alarmSetTime = moment().clone().add(5, "seconds");
// const alarmMaxTime = moment().clone().add(35, "seconds");
// const alarmSnooze = undefined;

const alarmSetTimeDisplay = state => {
  if (state.alarm.alarmSetTime) {
    switch (state.alarm.state) {
      case _collection.ALARM_STATE.OFF:
        return "Alarm turned off";
      case _collection.ALARM_STATE.ON:
        return "Wake up!!!";
      case _collection.ALARM_STATE.WAITING:
        return `Alarm time: ${state.alarm.alarmSetTime.format("DD.MM.YYYY HH:mm:ss")}`;
      case _collection.ALARM_STATE.SNOOZED:
        return `Alarm time: ${state.alarm.alarmSetTime.format("DD.MM.YYYY HH:mm:ss")}, Snoozed until: ${state.alarm.snoozeSetTime.format("DD.MM.YYYY HH:mm:ss")}`;
      default:
        return "";
    }
  } else return "Alarm not set";
};

const mapStateToProps = state => ({
  timeDisplay: state.time.format("DD.MM.YYYY HH:mm:ss"),
  alarmSetTimeDisplay: alarmSetTimeDisplay(state),
  alarmState: state.alarm.state
});

const mapDispatchToProps = dispatch => {
  let intervalId;
  dispatch((0, _collection.setalarmSetTime)(alarmSetTime, alarmMaxTime));
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
      dispatch((0, _collection.snoozeAlarm)((0, _moment2.default)(), alarmSnooze ? (0, _moment2.default)().clone().add(alarmSnooze, "minutes") : null));
    }
  };
};

const ClockContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Clock2.default);

exports.default = ClockContainer;