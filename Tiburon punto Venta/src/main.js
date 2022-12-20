
// is a electron file for the render
const { app, BrowserWindow , ipcMain} = require('electron')


if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    
  })
}

var actualItems;

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
      actualItems = data;
      console.log(actualItems) // <-- with this variable we can pass the data from main windows to other windows of the aplication
    })
  }
  
  app.allowRendererProcessReuse = false;

  app.whenReady().then(() => {
    createWindow();
  })


  ///////////////////////////


// actually i dont use this
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