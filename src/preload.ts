import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // You can add any Electron APIs you want to expose to the renderer process here
});