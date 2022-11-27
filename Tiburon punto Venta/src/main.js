
// is a electron file for the render
const { app, BrowserWindow , ipcMain} = require('electron')


if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    
  })
}

const createWindow = () => {
    const win = new BrowserWindow({
      maximizable: true,
      width: 1600,
      height: 900,
      webPreferences: {
        nodeIntegration: true,
      }
    })
  
    win.loadFile('./src/cajero/index.html')
  }

const secondWindow = () => {
  const secondWin = new BrowserWindow({
    maximizable: true,
    width: 400,
    height: 500,
    show: true ,
    webPreferences: {
      nodeIntegration: true
    }
  })

  secondWin.loadFile('./src/cajero/test.html')
}

module.exports = {
  createWindow,
  secondWindow,
}