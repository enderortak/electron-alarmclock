import React from "react";
import { remote, ipcRenderer } from "electron";


export default class TitleBar extends React.Component {
  static window() {
    return remote.getCurrentWindow();
  }
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
    if (this.window().isMaximized()) this.window().restore();
    else this.window().maximize();

    this.setState(prevState => ({ maximizeRestoreButton: prevState.maximizeRestoreButton === "maximize" ? "restore" : "maximize" }));
  }
  render() {
    return (
      <div id="titlebar">
        <div id="titlebar-windowtitle">
          <div><i className="fa fa-github fa-lg" aria-hidden="true" /></div>
          <div>This is window title!</div>
        </div>
        <div id="titlebar-actions">
          <div id="minimize-window" onClick={() => this.window().minimize()}>
            <i className="fa fa-window-minimize" aria-hidden="true" />
          </div>
          <div id="maximize-window" onClick={this.handleMaximizeRestore}>
            <i className={`fa fa-window-${this.state.maximizeRestoreButton}`} aria-hidden="true" />
          </div>
          <div id="close-window" onClick={() => this.window().close()}>
            <i className="fa fa-times fa-lg" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}
