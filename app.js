const url = require('url');
const path = require('path');
const {
  BrowserWindow, app, createWindow, ipcMain,
} = require('electron');

let mainWindow;

app.commandLine.appendSwitch('disable-web-security');
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#2e2c29',
    show: false,
    frame: false,
    resizable: true,
    "node-integration": "iframe", // and this line
    "web-preferences": {
      "web-security": false,
    },
  });
  mainWindow.loadURL(process.env.NODE_ENV === "development" ?
    "http://localhost:9000" :
    url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("maximize", () => { mainWindow.webContents.send("maximize"); });
  mainWindow.on("unmaximize", () => { mainWindow.webContents.send("restore"); });
  mainWindow.once('ready-to-show', () => { mainWindow.show(); /* win.webContents.openDevTools(); */ });
  mainWindow.on('closed', () => { mainWindow = null; process.exit(); });


  const childWindow = new BrowserWindow({
    width: 300,
    height: 300,
    backgroundColor: '#FFFF00',
    show: false,
    resizable: false,
    modal: true,
  });
  childWindow.on("close", (e) => { e.preventDefault(); childWindow.hide(); mainWindow.webContents.send("hideChildWindow"); });
  if (process.env.NODE_ENV === "development") attachDevServer(); // eslint-disable-line no-use-before-define
  ipcMain.on("showChildWindow", () => { childWindow.show(); });
  ipcMain.on("hideChildWindow", () => { childWindow.hide(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
app.on('activate', () => { if (mainWindow === null) { createWindow(); } });

const attachDevServer = () => {
  const { client } = require('electron-connect'); // eslint-disable-line
  client.create(mainWindow);
};
