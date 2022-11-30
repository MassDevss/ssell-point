
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
  
    win.loadFile('./src/cajero/index.html')
  }

const printWindow = () => {
  const secondWin = new BrowserWindow({
    maximizable: true,
    width: 400,
    height: 500,
    show: true ,
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  secondWin.loadFile('./src/cajero/ticket.html')
}

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
  printWindow,
  postTotalWindow
}