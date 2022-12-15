
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
      // autoHideMenuBar: true, // esta propiedad esconde el menubar o taskbar de arriba de la aplicacion !! activar solo en produccion !!
      webPreferences: {
        nodeIntegration: true,
      }
    })
  
    win.loadFile('./src/cajero/mainView/index.html')
  
    ipcMain.on('pickData:onNewOrder', (event, data)=>{
      win.webContents.send('pickData:returnOrder', 'asdasd')
    })
  }
  
  app.allowRendererProcessReuse = false;

  app.whenReady().then(() => {
    createWindow();
  })


  ///////////////////////////


const postTotalWindow = () => {
  const win = new BrowserWindow({
    maximizable: true,
    width: 600,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/cajero/postTotal.html')
}


module.exports = {
  createWindow,
  postTotalWindow
}