
// is a electron file for the render
const { app, BrowserWindow , ipcMain} = require('electron')
const {PosPrinter} = require('electron-pos-printer')

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    
  })
}

var actualItems;

// this is the MAIN WINDOW of the proyect
const createWindow = () => {
    const win = new BrowserWindow({
      maximizable: true,
      width: 1600,
      height: 900,
      // autoHideMenuBar: true, // this property hide the menuBar on top of the palication
      webPreferences: {
        nodeIntegration: true,
      }
    })
  
    win.loadFile('./src/cajero/mainView/index.html')
  
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

// this window is used to make querys to mysql and obtain data of one clinet
// Mauris view
const queryClients = () => {
  const win = new BrowserWindow({
    maximizable: true,
    width: 750,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/cajero/customersData/customersPane.html')
}


// only for develop
const developTest = () => {
  const win = new BrowserWindow({
    maximizable: true,
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/cajero/ordersRegister/index.html')
}


app.whenReady().then(() => {
  developTest();
  // createWindow();
  // queryClients();
})

module.exports = {
  createWindow,
  queryClients
}