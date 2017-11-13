const
    React = require('react'),
    ReactDOM = require('react-dom'),
    remote = require("electron").remote,
    ipc = require("electron").ipcRenderer;


export default class Content extends React.Component {
    render() {
        return <div id="content-wrapper">
            <div className="content">
                {this.props.children}
            </div>
        </div>

    }
}