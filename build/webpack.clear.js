/*
 *		Generic much page project
 * File Name    : webpack.clear.js
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

Log(chalk.hex("#7B68EE").bold("Clearing the last packaging result"))

const whiteLists = ['favicon.ico']
const whiteListPaths = whiteLists.map(filename => path.resolve(__dirname, '../server/public', filename))

// clean prev package
glob.sync(path.resolve(__dirname, "../client/dist") + "/*").forEach(async filePath => {
	del(filePath, () => { })
})

// clean publish to public
glob.sync(path.resolve(__dirname, "../server/public") + "/*").forEach(async filePath => {
  if(whiteListPaths.some(file => file == filePath.replace(/(\/)/g , "\\"))) return
	del(filePath, () => { })
})

// clean logs
glob.sync(path.resolve(__dirname, "../server/logs") + "/*").forEach(async filePath => {
	del(filePath, () => { })
})

Log(chalk.hex("#7B68EE").bold("Clearing done"))
