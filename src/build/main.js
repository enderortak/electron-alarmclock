"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _titlebar = require("./components/layout/titlebar");

var _titlebar2 = _interopRequireDefault(_titlebar);

var _content = require("./components/layout/content");

var _content2 = _interopRequireDefault(_content);

var _ViewApp = require("./components/ViewApp");

var _ViewApp2 = _interopRequireDefault(_ViewApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const electron = window.require('electron');
// const remote = electron.remote;
// console.log(remote.process.env.TZ);

(0, _reactDom.render)([_react2.default.createElement(_titlebar2.default, { key: "titlebar" }), _react2.default.createElement(
  _content2.default,
  { key: "content" },
  _react2.default.createElement(_ViewApp2.default, null)
)], document.getElementById('root'));