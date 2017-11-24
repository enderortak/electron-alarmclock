import React from "react";
import { remote, ipcRenderer } from "electron";

const window = () => remote.getCurrentWindow();

export default class TitleBar extends React.Component {
  constructor() {
    super();
    this.state = {
      maximizeRestoreButton: "maximize",
    };

    this.handleMaximizeRestore = this.handleMaximizeRestore.bind(this);
  }
  componentDidMount() {
    ipcRenderer.on("maximize", () => {
      this.setState({
        maximizeRestoreButton: "restore",
      });
    });

    ipcRenderer.on("restore", () => {
      this.setState({
        maximizeRestoreButton: "maximize",
      });
    });
  }
  handleMaximizeRestore() {
    if (window().isMaximized()) window().restore();
    else window().maximize();

    this.setState(prevState => ({ maximizeRestoreButton: prevState.maximizeRestoreButton === "maximize" ? "restore" : "maximize" }));
  }
  render() {
    return (
      <div id="titlebar">
        <div id="titlebar-windowtitle">
          <div><i className="fa fa-clock-o fa-lg" aria-hidden="true" /></div>
          <div>Adaptive Alarm Clock</div>
        </div>
        <div id="titlebar-actions">
          <div id="minimize-window" onClick={() => window().minimize()}>
            <i className="fa fa-window-minimize" aria-hidden="true" />
          </div>
          <div id="maximize-window" onClick={this.handleMaximizeRestore}>
            <i className={`fa fa-window-${this.state.maximizeRestoreButton}`} aria-hidden="true" />
          </div>
          <div id="close-window" onClick={() => window().close()}>
            <i className="fa fa-times fa-lg" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}
