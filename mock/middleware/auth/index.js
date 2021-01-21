/*
 *      Generic much page project.
 *  FileName:   index.js
 *  Create On:  2020/11/29 15:50
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const jwt = require("jsonwebtoken")
const { logger } = require("../log")

// api black list(RegExp)
const apiBlackList = ["^/api/permission"]

module.exports = async (ctx, next) => {
	const hasBlackItem = apiBlackList.filter(item => {
		let reg = new RegExp(item, "g")
		let flag = reg.test(ctx.request.url)
		return flag
	}).length > 0
	if (!hasBlackItem) {
		await next()
	} else {
		const preToken = ctx.cookies.get(ctx.config.USER_TOKEN_COOKIE_NAME)
		try {
			const tokenData = await jwt.verify(preToken, ctx.config.SECRET)
			console.log(tokenData)
			// 模拟刷新token(通过`tokenData`查询数据库)
			const payload = {
				account: "admin",
				sex: 1,
				phone: "18722229999",
				priority: 1,
				position: "programmer",
				date: +new Date,
			}
			const token = await jwt.sign(payload, ctx.config.SECRET, {expiresIn: 10 * 60 * 1000})
			ctx.cookies.set(ctx.config.USER_TOKEN_COOKIE_NAME, token, {
				domain: ctx.config.DOMAIN,
				path: "/",
				maxAge: 10 * 60 * 1000,
				overwrite: false,
				httpOnly: true,
			})
			await next()
		} catch (error) {
			ctx.body = {
				status: 401,
				error: "未授权,请先登录...",
				date: +new Date,
			}
			logger.error("[Validate token fail]," + error)
		}
	}
}
