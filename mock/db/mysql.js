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

const pool = mysql.createPool({
	port: config.MYSQL_PORT,
	host: config.MYSQL_HOST,
	user: config.MYSQL_USER,
	password: config.MYSQL_PASSWORD,
	database: config.MYSQL_DATABASE
})

console.log(`${chalk.gray("[0]") + chalk.hex("#007BFF").bold("Database connection successful.")}	`)

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
