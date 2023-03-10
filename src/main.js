
// is a electron file for the render
const { app, BrowserWindow , ipcMain} = require('electron');
const {PosPrinter} = require('electron-pos-printer');
const mysql = require("mysql");

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    
  })
}

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Q7f00h&OLio$uWF%li0A',
  database: 'tiburon_sp'
})

con.connect();

var actualItems;

// this is the MAIN WINDOW of the proyect
const mainWindow = () => {
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
      // console.log(actualItems) // <-- with this variable we can pass the data from main windows to other windows of the aplication
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
const reqClientWindow = () => {
  const win = new BrowserWindow({
    maximizable: true,
    width: 750, // px
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/cajero/customersData/customersPane.html')
}


// this window show's the all recount of orders
const clientsWindow = () => {
  const win = new BrowserWindow({
    maximizable: true,
    width: 1600,
    height: 900,
    // autoHideMenuBar: true, // this property hide the menuBar on top of the palication
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/cajero/ordersRegister/index.html')

  ipcMain.on('loadClientsWindow', (event) => {

    con.query("SELECT * FROM clientes", (err, res, field) => {
      if (err) console.log(err.code);
      else{
        win.webContents.send("fillData", {data: res})
      }
    })

  })

}


// ventanas mauri
app.whenReady().then(() => {
  clientsWindow();
  // mainWindow();
  // reqClientWindow(); // la tuya
})

module.exports = {
  mainWindow,
  //reqClientWindow
}