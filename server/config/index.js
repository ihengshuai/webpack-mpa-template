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
const { Server, Client } = require("../../config")

const config = {
	DOMAIN: Server.DOMAIN,
	SERVER_PORT: Server.PORT,
	WEB_PORT: Client.PORT,
	USER_TOKEN_COOKIE_NAME: Server.USER_TOKEN_COOKIE_NAME,
	AUTH_CODE_COOKIE_NAME: Server.AUTH_CODE_COOKIE_NAME,
	SECRET: Server.SECRET,
	USE_DB: Server.USE_DB,
	MYSQL_PORT: Server.MYSQL_PORT,
	MYSQL_HOST: Server.MYSQL_HOST || "127.0.0.1",
	MYSQL_USER: Server.MYSQL_USER,
	MYSQL_PASSWORD: Server.MYSQL_PASSWORD,
	MYSQL_DATABASE: Server.MYSQL_DATABASE,
	routePath: "../router/**/index.js",
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
