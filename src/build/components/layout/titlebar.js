"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const window = () => _electron.remote.getCurrentWindow();

class TitleBar extends _react2.default.Component {
  constructor() {
    super();
    this.state = {
      maximizeRestoreButton: "maximize"
    };

    this.handleMaximizeRestore = this.handleMaximizeRestore.bind(this);
  }
  componentDidMount() {
    _electron.ipcRenderer.on("maximize", () => {
      this.setState({
        maximizeRestoreButton: "restore"
      });
    });

    _electron.ipcRenderer.on("restore", () => {
      this.setState({
        maximizeRestoreButton: "maximize"
      });
    });
  }
  handleMaximizeRestore() {
    if (window().isMaximized()) window().restore();else window().maximize();

    this.setState(prevState => ({ maximizeRestoreButton: prevState.maximizeRestoreButton === "maximize" ? "restore" : "maximize" }));
  }
  render() {
    return _react2.default.createElement(
      "div",
      { id: "titlebar" },
      _react2.default.createElement(
        "div",
        { id: "titlebar-windowtitle" },
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("i", { className: "fa fa-clock-o fa-lg", "aria-hidden": "true" })
        ),
        _react2.default.createElement(
          "div",
          null,
          "Adaptive Alarm Clock"
        )
      ),
      _react2.default.createElement(
        "div",
        { id: "titlebar-actions" },
        _react2.default.createElement(
          "div",
          { id: "minimize-window", onClick: () => window().minimize() },
          _react2.default.createElement("i", { className: "fa fa-window-minimize", "aria-hidden": "true" })
        ),
        _react2.default.createElement(
          "div",
          { id: "maximize-window", onClick: this.handleMaximizeRestore },
          _react2.default.createElement("i", { className: `fa fa-window-${this.state.maximizeRestoreButton}`, "aria-hidden": "true" })
        ),
        _react2.default.createElement(
          "div",
          { id: "close-window", onClick: () => window().close() },
          _react2.default.createElement("i", { className: "fa fa-times fa-lg", "aria-hidden": "true" })
        )
      )
    );
  }
}
exports.default = TitleBar;