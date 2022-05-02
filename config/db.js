// //env file
require('dotenv').config({path:'.env'});
var mysql = require('mysql');
// const util = require('util');

//mysql connection
//local
var con = mysql.createConnection({
	// host: 'localhost',
	// user: 'root',
	// password: '',
	// database: 'node_test'
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

// const querys = util.promisify(con.query).bind(mc);

con.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Mysql Database Connected..!');
	}
});

module.exports = con;