/*
 *      Generic much page project.
 *  FileName:   index.js
 *  Create On:  2020/11/29 15:50
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const MD5 = require("crypto-js/md5")

module.exports = {
	// user login
	userLogin: async (ctx, next) => {
		// query sql
		const realPwd = MD5("123456").toString(),
			realAccount = "admin"
		return { realAccount, realPwd }
	},
}
