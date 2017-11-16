"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Content = ({ children }) => _react2.default.createElement(
  "div",
  { id: "content-wrapper", className: "flex-container" },
  _react2.default.createElement(
    "div",
    { className: "content flex-container" },
    children
  )
);

Content.propTypes = {
  children: _propTypes2.default.node.isRequired
};

exports.default = Content;