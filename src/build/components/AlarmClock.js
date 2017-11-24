"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _collection = require("../actions/_collection");

var _ClockDisplay = require("./ClockDisplay");

var _ClockDisplay2 = _interopRequireDefault(_ClockDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const snoozeButton = (isAlarmOn, snoozeAlarm) => isAlarmOn && _react2.default.createElement(
  "button",
  { className: "ui secondary button", onClick: snoozeAlarm },
  "Snooze Alarm"
);

const audio = (isAlarmOn, alarmSoundFile) => isAlarmOn && _react2.default.createElement(
  "audio",
  { autoPlay: true, loop: true },
  _react2.default.createElement("source", { src: alarmSoundFile, type: "audio/mpeg" })
);

class AlarmClock extends _react2.default.Component {
  componentDidMount() {
    this.props.clockStart();
  }
  componentWillUnmount() {
    this.props.clockStop();
  }
  render() {
    const isAlarmOn = this.props.alarmState === _collection.ALARM_STATE.ON;
    return _react2.default.createElement(
      "div",
      {
        className: (0, _classnames2.default)("clock flex-container", { "alarm-on": isAlarmOn }),
        onKeyDown: this.props.snoozeAlarm
      },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_ClockDisplay2.default, { time: this.props.timeDisplay }),
        _react2.default.createElement(
          "div",
          null,
          this.props.alarmSetTimeDisplay
        ),
        snoozeButton(isAlarmOn, this.props.snoozeAlarm)
      ),
      audio(isAlarmOn, this.props.alarmSoundFile)
    );
  }
}

AlarmClock.propTypes = {
  clockStart: _propTypes2.default.func.isRequired,
  clockStop: _propTypes2.default.func.isRequired,
  alarmState: _propTypes2.default.string.isRequired,
  snoozeAlarm: _propTypes2.default.func.isRequired,
  alarmSetTimeDisplay: _propTypes2.default.string.isRequired,
  timeDisplay: _propTypes2.default.string.isRequired,
  alarmSoundFile: _propTypes2.default.string.isRequired
};

exports.default = AlarmClock;