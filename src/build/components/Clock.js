"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _collection = require("../actions/_collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
          this.props.alarmSetTimeDisplay
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
  alarmSetTimeDisplay: _propTypes2.default.string.isRequired,
  timeDisplay: _propTypes2.default.string.isRequired
};

exports.default = Clock;