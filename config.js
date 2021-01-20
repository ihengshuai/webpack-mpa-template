/*
 *		Generic much page project
 * File Name    : config.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */

const dotenv = require("dotenv")

dotenv.config({
	path: "./.env"
})

const booleanMap = new Map([
	["false", false],
	["true", true],
])

module.exports = {
	Client: {
		PROJECT_TYPE: process.env.PROJECT_TYPE || "",
		PORT: process.env.WEB_PORT,
		SERVICE_RUN_MODE: process.env.SERVICE_RUN_MODE == undefined ? true : booleanMap.get(process.env.SERVICE_RUN_MODE),
	},
	Server: {
		PORT: process.env.SERVER_PORT
	}
}
