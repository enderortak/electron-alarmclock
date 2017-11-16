"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require("react-redux");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _collection = require("../actions/_collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const alarmSetTime = moment().add(5, "seconds")
// const alarmMaxTime = moment().add(30, "seconds")
// const alarmSnooze = 1;

const alarmSetTime = (0, _moment2.default)("2017-11-16").add(7, "hours").add(15, "minutes");
const alarmMaxTime = (0, _moment2.default)("2017-11-16").add(7, "hours").add(45, "minutes");
const alarmSnooze = 5;

class Clock extends _react2.default.Component {
  componentDidMount() {
    this.props.clockStart();
  }
  componentWillUnmount() {
    this.props.clockStop();
  }
  audio() {
    return this.props.alarmState === _collection.ALARM_STATE.ON ? _react2.default.createElement(
      "audio",
      { autoPlay: true, loop: true },
      _react2.default.createElement("source", { src: "assets/audio/alarm-sound.wav", type: "audio/mpeg" })
    ) : "";
  }
  render() {
    return _react2.default.createElement(
      "div",
      {
        className: "clock flex-container",
        style: {
          background: this.props.alarmState === _collection.ALARM_STATE.ON ? "red" : "none"
        },
        onClick: this.props.snoozeAlarm,
        onKeyDown: this.props.snoozeAlarm
      },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          null,
          this.props.alarmTimeDisplay
        ),
        _react2.default.createElement("br", null),
        _react2.default.createElement(
          "div",
          null,
          this.props.timeDisplay
        )
      ),
      this.audio()
    );
  }
}

Clock.propTypes = {
  clockStart: _propTypes2.default.func.isRequired,
  clockStop: _propTypes2.default.func.isRequired,
  alarmState: _propTypes2.default.string.isRequired,
  snoozeAlarm: _propTypes2.default.func.isRequired,
  alarmTimeDisplay: _propTypes2.default.string.isRequired,
  timeDisplay: _propTypes2.default.string.isRequired
};

const mapDispatchToProps = dispatch => {
  let intervalId;
  dispatch((0, _collection.setAlarmTime)(alarmSetTime, alarmMaxTime));
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
      dispatch((0, _collection.snoozeAlarm)((0, _moment2.default)().add(alarmSnooze, "minutes")));
    }
  };
};
const alarmTimeDisplay = state => {
  if (state.alarm.time) {
    switch (state.alarm.state) {
      case _collection.ALARM_STATE.OFF:
        return "Alarm turned off";
      case _collection.ALARM_STATE.ON:
        return "Wake up!!!";
      case _collection.ALARM_STATE.WAITING:
        return `Alarm time: ${state.alarm.time.format("DD.MM.YYYY HH:mm:ss")}`;
      case _collection.ALARM_STATE.SNOOZED:
        return `Alarm time: ${state.alarm.time.format("DD.MM.YYYY HH:mm:ss")}, Snoozed until: ${state.alarm.snoozeTime.format("DD.MM.YYYY HH:mm:ss")}`;
      default:
        return "";
    }
  } else return "Alarm not set";
};
const ClockContainer = (0, _reactRedux.connect)(state => ({
  timeDisplay: state.time.format("DD.MM.YYYY HH:mm:ss"),
  alarmTimeDisplay: alarmTimeDisplay(state),
  alarmState: state.alarm.state
}), mapDispatchToProps)(Clock);

exports.default = ClockContainer;