/*
 *      Generic much page project.
 *  FileName:   mysql.js
 *  Create On:  2020/11/29 15:35
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const mysql = require("mysql")
const chalk = require("chalk")
const { config } = require("../config")

const createMYSQL = () => {
	if (!config.USE_DB) return
	let connection = mysql.createConnection({
		port: config.MYSQL_PORT,
		host: config.MYSQL_HOST,
		user: config.MYSQL_USER,
		password: config.MYSQL_PASSWORD,
		database: config.MYSQL_DATABASE,
	})


	connection.connect(function (err) {
		if (err) {
			console.error("MYSQL: " + err.stack)
			return
		}
		console.log(`${chalk.gray("[2]") + chalk.hex("#007BFF").bold("Database connection successful: ")}
	${chalk.hex("#007BFF").bold("- PORT:")} ${config.MYSQL_PORT}
	${chalk.hex("#007BFF").bold("- HOST:")} ${config.MYSQL_HOST}
	${chalk.hex("#007BFF").bold("- USER:")} ${config.MYSQL_USER}
	${chalk.hex("#007BFF").bold("- DATABASE:")} ${config.MYSQL_DATABASE}
		`)
	})
}

createMYSQL()

const pool = mysql.createPool({
	port: config.MYSQL_PORT,
	host: config.MYSQL_HOST,
	user: config.MYSQL_USER,
	password: config.MYSQL_PASSWORD,
	database: config.MYSQL_DATABASE
})


const query = sql => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, conn) => {
			if (err) reject(err)
			conn.query(sql, (error, results, fields) => {
				if (error) reject(error)
				resolve({ results, fields })
				conn.release()
			})
		})
	})
}

module.exports = query
