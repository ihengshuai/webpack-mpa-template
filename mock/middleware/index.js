/*
 *      Generic much page project.
 *  FileName:   index.js
 *  Create On:  2020/11/29 15:42
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const fs = require("fs")
const path = require("path")
const koaStatic = require("koa-static")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")
const koaView = require("koa-views")
const { logger, accessLogger } = require("./log")
const verifyAuth = require("./auth")
const db = require("./mysql")
const Mock = require("mockjs").mock

const router = require("../router/route")

module.exports = async (app, config) => {
	app.on("error", error => {
		logger.error(error)
	})

	app.use(koaView(path.resolve(__dirname, "../template/"), { extension: "pug" }))

	app.use(async (ctx, next) => {
		ctx.config = config
		await next()
	})

	app.use(async (ctx, next) => {
		ctx.db = db
		await next()
	})

	app.use(accessLogger())

	app.use(async (ctx, next) => {
		ctx.Mock = Mock
		await next()
	})

	app.use(bodyParser())

	app.use(cors({
		origin: ctx => `http://${ctx.config.DOMAIN}:${ctx.config.WEB_PORT}`,
		maxAge: 5,
		credentials: true,
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization", "Accept"],
		exposeHeaders: ["WWW-Authenticate", "Server-Authorization"]
	}))

	app.use(koaStatic(path.resolve(__dirname, "../public")))

	app.use(koaStatic(path.resolve(__dirname, "../static")))

	app.use((ctx, next) => verifyAuth(ctx, next))

	app.use(router.routes()).use(router.allowedMethods())

}
