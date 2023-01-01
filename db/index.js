const mysql = require('mysql');

const conn = mysql.createPool({
	connectionLimit: 10,
	password: process.env.DB_PASS,
	user:process.env.DB_USER,
	database:process.env.MYSQL_DB,
	host:process.env.DB_HOST,
	port:process.env.DB_PORT
})

module.exports = conn;