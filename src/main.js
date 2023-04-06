
const { app, BrowserWindow , ipcMain} = require('electron');
const {PosPrinter} = require('electron-pos-printer');
const path = require("path");
// const mysql = require('mysql2')  // normal mysql


const dbConf = {
	host: '127.0.0.1',
	user: 'root',
	port: '3306',
	database: 'tiburon_sp',
	password: 'Q7f00h&OLio$uWF%li0A',
	connectTimeout: 3000
}

// promise mysql
const db = require('mysql2-promise')();

db.configure(dbConf)

/**
 * electron reload code
 */
if (process.env.NODE_ENV !== 'production') {
	require('electron-reload')(__dirname, {})
}


let acutalClient = null;

/**
 * 'mainWindow' -> is the window for checker and his view, is the employee view
 */
const mainWindow = () => {
	const win = new BrowserWindow({
		maximizable: true,
		width: 1600,
		height: 900,
		webPreferences: {
			preload: path.resolve('./src/preloads/mainWindowsPreload.js')
		}
	})

	win.loadFile('./src/cajero/mainView/orders.html');


	/**
	 *  'printTime' -> is an event to use a thermal printer for tickets
	 *
	 * @param dataPrint {Object} -> is a object with all products and data to print
	 */
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

	});


	// catch data from reqClientsWindow and send it to mainWindow
	ipcMain.on("apllyClient", (event, data) => {
		win.webContents.send("replyClient", data);
		event.sender.close();
	});

	ipcMain.on("openClients", (event) => {
		reqClientWindow();
	})

}


/**
 *
 * reqClientWindow -> deploys on click on 'buscar' button in address
 *
 * this window is used to make query's to mysql and obtain data of one client
 *
 */
const reqClientWindow = () => {
	const win = new BrowserWindow({
		maximizable: true,
		width: 750,
		height: 500,
		webPreferences: {
			preload: path.resolve("./src/preloads/reqClientPreload.js")
		}
	});

	win.loadFile(path.join(__dirname, "/cajero/customersData/customersPane.html"));
}

// reqClientEvent
ipcMain.handle('getClient',  (event, tel) => {

	const res =  db.query(`SELECT * FROM clientes WHERE telefono='${tel}'`).spread((clients) => {
		return JSON.stringify(clients)
	})
	acutalClient = res;
	return res;
});

ipcMain.handle('newClient',  (event, data) => {
	const sql = `INSERT INTO clientes (nombre, telefono, direccion) VALUES ('${data['name']}','${data['phone']}','${data['direction']}')`;
	db.query(sql).spread(data => console.log(data));
});








app.allowRendererProcessReuse = false;

/**
 *
 *  clientsWindow(); -> window to show a client's list
 *
 *
 */

app.whenReady().then(() => {
	mainWindow();
	// reqClientWindow();
})

module.exports = {
	mainWindow,
	reqClientWindow
}