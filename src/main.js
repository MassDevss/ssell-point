
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


// Obtaining the Actual date
const date = new Date();
const arrDate = date.toLocaleDateString().split("/");

const checkLen = (date) => {
  return `${date}`.length > 1 ? `${date}` : `0${date}`;
};

const hours = checkLen(date.getHours() - 1);
const minutes = checkLen(date.getMinutes());

const getActualDate = (wTime) => {

	if (wTime){
		return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(arrDate[1])} ${hours}:${minutes}:00`;
	}

	return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(arrDate[1])}`;
}


/**
 * 'tellerView' -> is the window for checker and his view, is the employee view
 */
const tellerView = () => {
	const win = new BrowserWindow({
		maximizable: true,
		width: 1600,
		height: 900,
		// autoHideMenuBar: true, // ! uncomment in production
		webPreferences: {
			preload: path.resolve(path.join(__dirname, 'preloads/tellerView.preload.js'))
		}
	})

	win.loadFile('./src/cajero/tellerView/index.html');


	/** 
	* catch data from requestClient and send it to tellerView 
	* 
	*/
	ipcMain.on("apllyClient", (event, data) => {
		win.webContents.send("replyClient", data);
		event.sender.close();
	});

}


/**
 *
 * requestClient -> deploys on click on 'buscar' button in address
 *
 * this window is used to make query's to mysql and obtain data of one client
 *
 */
const requestClient = () => {
	const win = new BrowserWindow({
		maximizable: true,
		width: 750,
		height: 500,
		// autoHideMenuBar: true,  // ! uncoment in production enviroment
		webPreferences: {
			preload: path.resolve(path.join(__dirname, "preloads/requestClient.preload.js"))
		}
	});

	win.loadFile(path.join(__dirname, "/cajero/requestClient/requestClient.html"));
}



/**
 * !    WARNING AREA
 * 
 * * events section, please becareful
 * * here area events of each window
 * * the corresponsive window is declared on documentation
 *
 */




/**
	 * 'printTime' -> is an event to use a thermal printer for tickets
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



/** 
 * simple open's the pop up
 */
ipcMain.on("openClients", (event) => {
	requestClient();
})

/**
 * 
 * @param tel {string} is the celphone number of user to search in DB
 * 
 */
ipcMain.handle('getClient',  (event, tel) => {

	const res =  db.query(`SELECT * FROM clientes WHERE telefono='${tel}'`).spread((clients) => {
		return JSON.stringify(clients)
	})
	acutalClient = res;
	return res;
	
});

/**
 * 
 * @param data {Object} -> contains all data of user like name, phone and direction
 * 
 * create a new client in database
 * 
 */
ipcMain.handle('newClient',  (event, data) => {

	const sql = `INSERT INTO clientes (nombre, telefono, direccion) VALUES ('${data['name']}','${data['phone']}','${data['direction']}')`;
	db.query(sql).spread(data => console.log(data));

});


/**
 * 
 * 
 * 
 * 
 */


ipcMain.on('saveOrder', (event, orderData) => {

	const checkLen = (date) => {
		return `${date}`.length > 1 ? `${date}` : `0${date}`;
	}

	const date = new Date();
	const arrDate = date.toLocaleDateString().split('/');
// const formatTime = date.toLocaleTimeString().replace(/[A-Z]/g, '');
	let processHour = date.getHours();

	if (processHour === 0){
		processHour = 23;
	}else {
		processHour -= 1;
	}

	const hours = checkLen(processHour);
	const minutes = checkLen(date.getMinutes());
	const seconds = checkLen(date.getSeconds());

	const formatDate = `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(arrDate[1])}`;
	const formatTime = `${hours}:${minutes}:${seconds}`;



	let orderProducts = '';

	orderData.orders.forEach((row) => {
		const prodName = row[0];
		const prodCount = row[2];

		orderProducts += `${prodCount}-${prodName},`;
	});

	const productsString = orderProducts.slice(0, -1);
	const cost = orderData.cost.replace('$', '');

	const sql = `INSERT INTO orders (date,time, products, address, cost, numOrder) VALUES ('${formatDate}','${formatTime}', '${productsString}','${orderData.address}','${cost}', '${orderData.numOrder}')`;
	db.query(sql).spread(data => console.log(data));

});


ipcMain.handle('getOrders', (event, filters) => {

	const actualDate = getActualDate(false);

	const dayFilter = {
		from: filters.date.from || null,
		to: filters.date.to || null
	};


	let conditions = '';

	if (dayFilter.from !== null){
		conditions += `orders.date >= date('${dayFilter.from}') AND orders.date <= date('${dayFilter.to}') AND `;
	}else {
		conditions += `orders.date = date('${actualDate}') AND `;
	}

	// TODO write all future conditions here





	// slicing the las 'AND' from the string for no Sql Error Syntax
	if (conditions !== ''){
		conditions = conditions.slice(0, -4);
	}

	const sql = `SELECT * FROM orders WHERE ${conditions}`;
	console.log(sql);

	const res = db.query(sql).spread((data) => {
		return data;
	});

	return res;
});














app.allowRendererProcessReuse = false;


app.whenReady().then(() => {
	tellerView();
	// ordersRecount();
})

module.exports = {
	tellerView,
	requestClient
}