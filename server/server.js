/*
 *      Generic much page project.
 *  FileName:   server.js
 *  Create On:  2020/11/29 15:35
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const fs = require("fs")
const path = require("path")
const { config } = require("./config")
config.NODE_ENV = process.env.NODE_ENV
const Koa = require("koa")
const app = new Koa()
const middleware = require("./middleware")
const openBrowser = require("open")
const theIP = require("./util").theIP()
const chalk = require("chalk")
const Log = console.log

try {

	middleware(app, config)

	// 404
	app.use(async (ctx, next) => {
		ctx.redirect("/404?errorURL=" + ctx.request.url)
	})


	app.listen(config.SERVER_PORT)
	Log(`
${chalk.gray("[1]") + chalk.hex("#007BFF").bold("Server is running at:")}
${chalk.hex("#007BFF").bold("- Local:")}   ${chalk.underline("http://localhost:" + config.SERVER_PORT)}
${chalk.hex("#007BFF").bold("- Network:")} ${chalk.underline("http://" + config.DOMAIN + ":" + config.SERVER_PORT)}\n`)
	config.NODE_ENV ? openBrowser(`http://${config.DOMAIN}:${config.SERVER_PORT}`) : null
} catch (error) {
	throw Error("server throw error: " + error)
}
