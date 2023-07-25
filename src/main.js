
// Electron Core
const { app, BrowserWindow , ipcMain} = require('electron');

// Native Modules
const path = require('path');

// extrnal modules and libraries
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const {PosPrinter} = require('electron-pos-printer');


const dbConf = {
	host: '127.0.0.1',
	user: 'root',
	port: '3306',
	database: 'tiburon_sp',
	password: 'Q7f00h&OLio$uWF%li0A'
};

async function makeQuery(query) {
	const conn = await mysql.createConnection(dbConf);
	const [rows] = await conn.execute(query);
	await conn.end();

	return rows;
}


/**
 * electron reload code
 */
if (process.env.NODE_ENV !== 'production') {
	require('electron-reload')(__dirname, {});
}


// Obtaining the Actual date
const date = new Date();
const arrDate = date.toLocaleDateString().split('/');

const checkLen = (date) => {
	return `${date}`.length > 1 ? `${date}` : `0${date}`;
};

const hours = checkLen(date.getHours() - 1);
const minutes = checkLen(date.getMinutes());

const getActualDate = (wTime) => {

	if (wTime){
		return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(arrDate[1])} ${hours}:${minutes}:00`;
	}

	if (date.getHours() === 0){
		return `${arrDate[2]}-${checkLen(arrDate[0])}-${checkLen(parseInt(arrDate[1]) - 1)}`;
	}
	
	return `${arrDate[2]}-${checkLen(arrDate[1])}-${checkLen(arrDate[0])}`;
	
};


/**
 * 'tellerView' -> is the window for checker and his view, is the employee view
 */
const tellerView = () => {
	const win = new BrowserWindow({
		maximizable: true,
		width: 1600,
		height: 900,
		darkTheme: true,
		// autoHideMenuBar: true, // ! uncomment in production
		webPreferences: {
			preload: path.resolve(path.join(__dirname, 'preloads/tellerView.preload.js'))
		}
	});

	win.loadFile('./src/views/tellerView/index.html');


	/** 
	* catch data from requestClient and send it to tellerView 
	* 
	*/
	ipcMain.on('apllyClient', (event, data) => {
		win.webContents.send('replyClient', data);
		event.sender.close();
	});

};


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
		darkTheme: true,
		// autoHideMenuBar: true,  // ! uncoment in production enviroment
		webPreferences: {
			preload: path.resolve(path.join(__dirname, 'preloads/requestClient.preload.js'))
		}
	});

	win.loadFile(path.join(__dirname, '/views/requestClient/index.html'));
};



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
	}).catch(error => console.log(error));
});



/** 
 * simple open's the pop up
 */
ipcMain.on('openClients', () => {
	requestClient();
});

/**
 * 
 * @param tel {string} is the celphone number of user to search in DB
 * 
 */
ipcMain.handle('getClient',  (event, tel) => {
	const sql = `SELECT * FROM clientes WHERE telefono='${tel}'`;
	const response = makeQuery(sql);

	return response;
});

/**
 * 
 * @param data {Object} -> contains all data of user like name, phone and direction
 * 
 * create a new client in database
 * 
 */
ipcMain.handle('newClient', async (event, data) => {
	const sql = `INSERT INTO clientes (nombre, telefono, direccion) VALUES ('${data['name']}','${data['phone']}','${data['direction']}')`;

	const res = makeQuery(sql);
	console.log(res);
});


// save and order
ipcMain.on('saveOrder', async (event, orderData) => {
	let orderProducts = '';

	orderData.orders.forEach((row) => {
		const prodName = row[0];
		const prodCount = row[2];

		orderProducts += `${prodCount}-${prodName}, `;
	});

	const productsString = orderProducts.slice(0, -2);
	const cost = orderData.cost.replace('$', '');
	const address = orderData.address === '' ? 'local' : orderData.address;

	const sql = `INSERT INTO orders (date,time, products, address, cost) VALUES (NOW(),NOW(), '${productsString}','${address}','${cost}')`;

	const res = makeQuery(sql);
	console.log(res);
});

ipcMain.handle('getOrders', async (event, filters) => {

	const dayFilter = {
		from: filters.date.from || null,
		to: filters.date.to || null
	};

	const costs = {
		min: filters.cost.min || null,
		max: filters.cost.max || null
	};

	const addressFil = filters.address;

	let conditions = '';

	if (dayFilter.from !== null){
		conditions += `orders.date >= date('${dayFilter.from}') AND orders.date <= date('${dayFilter.to}') AND `;
	}else {
		const actualDate = getActualDate(false).split('-');
		const formatForDb = `${actualDate[0]}-${actualDate[2]}-${actualDate[1]}`;

		conditions += `orders.date = date('${formatForDb}') AND `;
	}

	// TODO write all future conditions here

	if (addressFil !== null){
		conditions += `orders.address LIKE '%${addressFil}%' AND `;
	}

	if (costs.min !== null || costs.max !== null){
		if (costs.min !== null && costs.max !== null){

			const min = costs.min.replace('$', '');
			const max = costs.max.replace('$', '');

			conditions += `orders.cost >= '${min}' AND orders.cost <= '${max}' AND `;
		} 
		else if (costs.min !== null){
			const min = costs.min.replace('$', '');
			conditions += `orders.cost >= '${min}' AND `;
		}
		else if (costs.max !== null){
			const max = costs.max.replace('$', '');
			conditions += `orders.cost <= '${max}' AND `;
		}
	}

	// slicing the las 'AND' from the string for no Sql Error Syntax
	if (conditions !== ''){
		conditions = conditions.slice(0, -4);
	}

	const sql = `SELECT * FROM orders WHERE ${conditions}`;
	const res = makeQuery(sql);

	return res;
});

ipcMain.handle('modOrder', async (event, orderData) => {
	const sql = `UPDATE orders SET time='${orderData.hour}', products='${orderData.products}', address='${orderData.address}', cost='${orderData.cost}' WHERE id='${orderData.id}'`;
	const res = makeQuery(sql);

	return res;
});

ipcMain.handle('delOrder', async (event, orderId) => {
	const sql = `DELETE FROM orders WHERE id='${orderId}'`;
	const res = makeQuery(sql);

	return res;
});

ipcMain.handle('checkPassword', async (event, password) => {
	return bcrypt.compareSync(password, '$2a$10$mnq2oKZJltF6myMlvPw0H.W/4tSlW4sll1BFpZZ0eCN79tTnkGoSe');
});

// get products from json
// ipcMain.handle('getProducts', async () => {

// 	const data = await fs.readFile('./views/mocks/prices.json');



// });


app.allowRendererProcessReuse = false;


app.whenReady().then(() => {
	tellerView();
});
