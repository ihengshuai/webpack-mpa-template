/*
 *      Generic much page project.
 *  FileName:   route.js
 *  Create On:  2020/11/29 15:45
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */


const Route = require("koa-router")
const router = new Route()
const { routes } = require("../config")

router.use(...routes)
	.get("/404", async (ctx, next) => {
		await ctx.render("404", { errorURL: ctx.query.errorURL })
	})
	
module.exports = router
