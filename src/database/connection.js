
const mysql = require('mysql2/promise');


const dbConf = {
	host: 'localhost',
	user: 'root',
	port: 3306,
	database: 'tiburon_sp',
	password: 'Q7f00h&OLio$uWF%li0A'
};


function getConnection() {
	return mysql.createConnection(dbConf);
}


module.exports = getConnection;

