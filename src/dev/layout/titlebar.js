const
React = require('react'),
ReactDOM = require('react-dom'),
remote = require("electron").remote,
ipc = require("electron").ipcRenderer;


export default class TitleBar extends React.Component {
    constructor(){
        super();
        this.state ={
            maximizeRestoreButton: "maximize"
        }

        this.handleMaximizeRestore = this.handleMaximizeRestore.bind(this);
    }
    componentDidMount(){
        ipc.on("maximize", (e) => {
            this.setState({
                maximizeRestoreButton: "restore"
            });
          });
      
          ipc.on("restore", (e) => {
            this.setState({
                maximizeRestoreButton: "maximize"
            });     
          });
    }
    window() {
        return remote.getCurrentWindow(); 
      }
    handleMaximizeRestore(){
        if (this.window().isMaximized()) this.window().restore();
        else this.window().maximize();

        this.setState((prevState, props) => {
            return {maximizeRestoreButton: prevState.maximizeRestoreButton === "maximize" ? "restore" : "maximize"}
        })
    }
    render() {
        return <div id="titlebar">
                    <div id="titlebar-windowtitle">
                        <div><i className="fa fa-github fa-lg" aria-hidden="true"></i></div>
                        <div>This is window title!</div>
                    </div>
                    <div id="titlebar-actions">
                        <div id="minimize-window" onClick={()=> this.window().minimize()}><i className="fa fa-window-minimize" aria-hidden="true"></i></div>
                        <div id="maximize-window" onClick={this.handleMaximizeRestore}><i className={`fa fa-window-${this.state.maximizeRestoreButton}`} aria-hidden="true"></i></div>
                        <div id="close-window" onClick={() => this.window().close()}><i className="fa fa-times fa-lg" aria-hidden="true"></i></div>
                    </div>
                </div>

    }
}