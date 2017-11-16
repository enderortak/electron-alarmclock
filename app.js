const url = require('url');
const path = require('path');
const { BrowserWindow, app, createWindow } = require('electron');
const { client } = require('electron-connect');

let mainWindow;


app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#2e2c29',
    show: false,
    frame: false,
    resizable: true,
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  mainWindow.on("maximize", () => { mainWindow.webContents.send("maximize"); });
  mainWindow.on("unmaximize", () => { mainWindow.webContents.send("restore"); });
  mainWindow.once('ready-to-show', () => { mainWindow.show(); /* win.webContents.openDevTools(); */ });
  mainWindow.on('closed', () => { mainWindow = null; });
  client.create(mainWindow);
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
app.on('activate', () => { if (mainWindow === null) { createWindow(); } });

