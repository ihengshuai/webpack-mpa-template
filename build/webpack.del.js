/*
 *		Generic much page project
 * File Name    : webpack.del.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */

const fs = require("fs")
const path = require("path")
const del = require("rimraf")
const glob = require("glob")
const chalk = require("chalk")
const Log = console.log

Log(chalk.hex("#3CB371").bold("Starting clear the last packaging result."))

// clean prev package
glob.sync(path.resolve(__dirname, "../dist") + "/*").forEach(async filePath => {
	await	del(filePath, () => {
		Log(chalk.hex("#E9232C").bold("delete: ") + chalk.hex("#666").underline(filePath))
	})
})

// clean publish to public
glob.sync(path.resolve(__dirname, "../mock/public") + "/*").forEach(async filePath => {
	await	del(filePath, () => {
		Log(chalk.hex("#E9232C").bold("delete: ") + chalk.hex("#666").underline(filePath))
	})
})

// clean logs
glob.sync(path.resolve(__dirname, "../mock/logs") + "/*").forEach(async filePath => {
	await	del(filePath, () => {
		Log(chalk.hex("#E9232C").bold("delete: ") + chalk.hex("#666").underline(filePath))
	})
})
