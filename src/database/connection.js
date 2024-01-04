
const mysql = require('mysql2/promise');


const dbConf = {
	host: 'localhost',
	user: 'root',
	port: 3306,
	database: 'tiburon_sp',
	password: '2004'
};


function getConnection() {
	return mysql.createConnection(dbConf);
}


module.exports = getConnection;

