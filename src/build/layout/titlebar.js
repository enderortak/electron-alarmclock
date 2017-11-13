'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const React = require('react'),
      ReactDOM = require('react-dom'),
      remote = require("electron").remote,
      ipc = require("electron").ipcRenderer;

class TitleBar extends React.Component {
    constructor() {
        super();
        this.state = {
            maximizeRestoreButton: "maximize"
        };

        this.handleMaximizeRestore = this.handleMaximizeRestore.bind(this);
    }
    componentDidMount() {
        ipc.on("maximize", e => {
            this.setState({
                maximizeRestoreButton: "restore"
            });
        });

        ipc.on("restore", e => {
            this.setState({
                maximizeRestoreButton: "maximize"
            });
        });
    }
    window() {
        return remote.getCurrentWindow();
    }
    handleMaximizeRestore() {
        if (this.window().isMaximized()) this.window().restore();else this.window().maximize();

        this.setState((prevState, props) => {
            return { maximizeRestoreButton: prevState.maximizeRestoreButton === "maximize" ? "restore" : "maximize" };
        });
    }
    render() {
        return React.createElement(
            'div',
            { id: 'titlebar' },
            React.createElement(
                'div',
                { id: 'titlebar-windowtitle' },
                React.createElement(
                    'div',
                    null,
                    React.createElement('i', { className: 'fa fa-github fa-lg', 'aria-hidden': 'true' })
                ),
                React.createElement(
                    'div',
                    null,
                    'This is window title!'
                )
            ),
            React.createElement(
                'div',
                { id: 'titlebar-actions' },
                React.createElement(
                    'div',
                    { id: 'minimize-window', onClick: () => this.window().minimize() },
                    React.createElement('i', { className: 'fa fa-window-minimize', 'aria-hidden': 'true' })
                ),
                React.createElement(
                    'div',
                    { id: 'maximize-window', onClick: this.handleMaximizeRestore },
                    React.createElement('i', { className: `fa fa-window-${this.state.maximizeRestoreButton}`, 'aria-hidden': 'true' })
                ),
                React.createElement(
                    'div',
                    { id: 'close-window', onClick: () => this.window().close() },
                    React.createElement('i', { className: 'fa fa-times fa-lg', 'aria-hidden': 'true' })
                )
            )
        );
    }
}
exports.default = TitleBar;