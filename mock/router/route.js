/*
 *      Generic much page project.
 *  FileName:   route.js
 *  Create On:  2020/11/29 15:45
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */


const router = require("koa-router")({prefix: "/admin"})
const { routes } = require("../config")
router.use(...routes)
	.get("/404", async (ctx, next) => {
		ctx.body = 404
	})
module.exports = router
