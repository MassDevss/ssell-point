
// is a electron file for the render
const { app, BrowserWindow , ipcMain} = require('electron')
const {PosPrinter} = require('electron-pos-printer')

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
  
    win.loadFile('./src/cajero/PanelUi/panel.html')
  
    ipcMain.on('pickData:onNewOrder', (event, data)=>{
      actualItems = data;
      console.log(actualItems) // <-- with this variable we can pass the data from main windows to other windows of the aplication
    })

    ipcMain.on('printTime', (event, dataPrint) => {
      const dataToPrint = JSON.parse(dataPrint);
      PosPrinter.print(dataToPrint, {
        printerName: 'EC-PRINTER',
        silent: true,
        preview: false,
        margin: '0 0 0 0',
        copies: 1,
        timeOutPerLine: 1000,
      }).catch(error => console.log(error))
    })
  }
  
  app.allowRendererProcessReuse = false;

  app.whenReady().then(() => {
    createWindow();
  })


  ///////////////////////////


// actually i dont use this
const queryClients = () => {
  const win = new BrowserWindow({
    maximizable: true,
    width: 600,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/cajero/customersDataControl/customersData.html')
}


module.exports = {
  createWindow,
  queryClients
}