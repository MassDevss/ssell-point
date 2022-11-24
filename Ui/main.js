
// is a electron file for the render
const { app, BrowserWindow } = require('electron')

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    
  })
}


const createWindow = () => {
    const win = new BrowserWindow({
      maximizable: true,
      width: 1600,
      height: 900
    })
  
    win.loadFile('./src/views/cajero/index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

