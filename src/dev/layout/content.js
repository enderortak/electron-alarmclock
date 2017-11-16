const
    React = require('react'),
    ReactDOM = require('react-dom'),
    remote = require("electron").remote,
    ipc = require("electron").ipcRenderer;


export default class Content extends React.Component {
    render() {
        return <div id="content-wrapper" className="flex-container">
            <div className="content" className="flex-container">
                {this.props.children}
            </div>
        </div>

    }
}