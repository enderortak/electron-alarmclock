"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const numberAsText = number => ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][number];

const ClockDigit = value => _react2.default.createElement(
  "div",
  { className: `digit ${numberAsText(value)}` },
  [...Array(7)].map((e, i) => _react2.default.createElement("div", { className: "unit", key: i }))
);
const ClockDisplay = ({ time }) => {
  const timeAsArray = time.split(":").map(e => [parseInt(e.substring(0, 1), 10), parseInt(e.substring(1, 2), 10)]);
  return _react2.default.createElement(
    "div",
    { className: "clock-display" },
    ClockDigit(timeAsArray[0][0]),
    ClockDigit(timeAsArray[0][1]),
    _react2.default.createElement(
      "div",
      { className: "divider" },
      ":"
    ),
    ClockDigit(timeAsArray[1][0]),
    ClockDigit(timeAsArray[1][1]),
    _react2.default.createElement(
      "div",
      { className: "divider" },
      ":"
    ),
    ClockDigit(timeAsArray[2][0]),
    ClockDigit(timeAsArray[2][1]),
    _react2.default.createElement("div", { className: "debug", id: "debug" })
  );
};

ClockDisplay.propTypes = {
  time: _propTypes2.default.string.isRequired
};

exports.default = ClockDisplay;