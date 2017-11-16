"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require("redux");

var _time = require("./time");

var _time2 = _interopRequireDefault(_time);

var _alarm = require("./alarm");

var _alarm2 = _interopRequireDefault(_alarm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reducerCollection = (0, _redux.combineReducers)({
    time: _time2.default, alarm: _alarm2.default
});

exports.default = reducerCollection;