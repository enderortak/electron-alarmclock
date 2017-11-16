"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _collection = require("../actions/_collection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const time = (state = (0, _moment2.default)(), action) => action.type === _collection.CLOCK_TICK ? (0, _moment2.default)() : state;

exports.default = time;