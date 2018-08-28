const mysql = require('mysql2');

function createConnection(){
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'siscaixa',
	});	

	return connection;
}
