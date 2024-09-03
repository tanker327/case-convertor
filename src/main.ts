import { app, BrowserWindow, session } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Set a custom property for settings width
  win.webContents.executeJavaScript(`
    window.SETTINGS_WIDTH = 200; // Set your desired fixed width here
  `);

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();

    // Load custom DevTools extension
    session.defaultSession.loadExtension(path.join(__dirname, '..', 'devtools-extension'))
      .then(() => console.log('DevTools extension loaded'))
      .catch(err => console.error('Failed to load DevTools extension', err));
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});