/*
 *      Generic much page project.
 *  FileName:   index.js
 *  Create On:  2020/11/29 15:46
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const glob = require("glob")
const path = require("path")
const fs = require("fs")
const serverconfig = require("../../config")

const config = {
	Domain: serverconfig.Domain || "localhost",
	SERVER_PORT: serverconfig.SERVER_PORT || 9999,
	routePath: serverconfig.routePath || "../router/**/index.js",
	MYSQL_HOST: serverconfig.MYSQL_HOST || "127.0.0.1",
	MYSQL_USER: serverconfig.MYSQL_USER || "root",
	MYSQL_PASSWORD: serverconfig.MYSQL_PASSWORD || "root",
	MYSQL_DATABASE: serverconfig.MYSQL_DATABASE || "demo"
}

const findFiles = filterPath => {
	return glob.sync(filterPath)
}

const routes = findFiles(path.resolve(__dirname, config.routePath)).map(router => require(router).routes())

module.exports = {
	findFiles,
	routes,
	config,
}
