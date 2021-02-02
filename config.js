/*
 *		Generic much page project
 * File Name    : config.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */

const dotenv = require("dotenv")
const { theIP } = require("./server/util/index")

dotenv.config({
	path: "./.env"
})

const booleanMap = new Map([
	["false", false],
	["true", true],
])

const getDomain = domain => {
	if (!domain || domain == "localhost") return theIP()
	return domain
}

module.exports = {
	Client: {
		PROJECT_TYPE: process.env.PROJECT_TYPE || "",
		PORT: process.env.WEB_PORT,
		SERVICE_RUN_MODE: process.env.SERVICE_RUN_MODE == undefined ? true : booleanMap.get(process.env.SERVICE_RUN_MODE),
		USE_HASH: process.env.USE_HASH == undefined ? true : booleanMap.get(process.env.USE_HASH),
		DOMAIN: getDomain(process.env.DOMAIN),
		USER_TOKEN_COOKIE_NAME: process.env.USER_TOKEN_COOKIE_NAME,
		AUTH_CODE_COOKIE_NAME: process.env.AUTH_CODE_COOKIE_NAME,
		OPEN_BROWER: process.env.OPEN_BROWER == undefined ? true : booleanMap.get(process.env.OPEN_BROWER),
	},
	Server: {
		PORT: process.env.SERVER_PORT || 9999,
		DOMAIN: getDomain(process.env.DOMAIN),
		USER_TOKEN_COOKIE_NAME: process.env.USER_TOKEN_COOKIE_NAME,
		AUTH_CODE_COOKIE_NAME: process.env.AUTH_CODE_COOKIE_NAME,
		SECRET: process.env.SECRET,
		USE_DB: process.env.USE_DB == undefined ? false : booleanMap.get(process.env.USE_DB),
		MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
		MYSQL_HOST: process.env.MYSQL_HOST,
		MYSQL_USER: process.env.MYSQL_USER,
		MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
		MYSQL_DATABASE: process.env.MYSQL_DATABASE,
	}
}
