"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _collection = require("../reducers/_collection");

var _collection2 = _interopRequireDefault(_collection);

var _collection3 = require("../subscriptions/_collection");

var _collection4 = _interopRequireDefault(_collection3);

var _Clock = require("../components/Clock");

var _Clock2 = _interopRequireDefault(_Clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = (0, _redux.createStore)(_collection2.default);

store.subscribe(() => {
  _collection4.default.forEach(subscription => {
    subscription(store.getState(), store.dispatch);
  });
});

const ViewApp = () => _react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_Clock2.default, null)
);

exports.default = ViewApp;