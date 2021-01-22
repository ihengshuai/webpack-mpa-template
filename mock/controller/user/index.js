/*
 *      Generic much page project.
 *  FileName:   index.js
 *  Create On:  2020/11/29 15:50
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

module.exports = {
	// 获取用户信息
	getUsers: async (ctx, next) => {
		ctx.body = await ctx.Mock({
			status: 200,
			path: ctx.path,
			dataList: {
				"users|20-30": [
					{
						"id|+1": 0,
						"age|18-24": 18,
						"username": "@cname",
						"province": "@province"
					}
				],
			},
			date: +new Date,
		})
	},
}
