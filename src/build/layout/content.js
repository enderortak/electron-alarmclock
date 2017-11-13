'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const React = require('react'),
      ReactDOM = require('react-dom'),
      remote = require("electron").remote,
      ipc = require("electron").ipcRenderer;

class Content extends React.Component {
    render() {
        return React.createElement(
            'div',
            { id: 'content-wrapper' },
            React.createElement(
                'div',
                { className: 'content' },
                this.props.children
            )
        );
    }
}
exports.default = Content;