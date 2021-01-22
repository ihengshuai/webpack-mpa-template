/*
 *      Generic much page project.
 *  FileName:   index.js
 *  Create On:  2020/11/29 15:57
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

const interfaces = require("os").networkInterfaces()


/**
 *
 * @param interfaces
 * @returns ip
 */
function theIP(){
	for (var devName in interfaces) {
		var iface = interfaces[devName]
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i]
			if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
				return alias.address
			}
		}
	}
}


module.exports = {
	theIP
}
