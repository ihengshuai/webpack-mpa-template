/*
 *		Generic much page project
 * File Name    : webpack.dev.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */

const webpack = require("webpack")
const { merge } = require("webpack-merge")
const { BASE_CONFIFG, PORT, Server_PORT, resolve, DOMAIN } = require("./webpack.config")
const { loaders } = require("./webpack.loader")

const devConfig = merge(BASE_CONFIFG, {
	mode: "development",
	output: {
		path: resolve("../dist"),
		filename: "js/[name].js"
	},
	devtool: "#cheap-module-eval-source-map",
	devServer: {
		host: DOMAIN,
		disableHostCheck: true,
		useLocalIp: true,
		port: PORT,
		open: true,
		contentBase: resolve("../dist"),
		historyApiFallback: true,
		overlay: {
			warnings: false,
			errors: true
		},
		stats: "errors-only",
		proxy: {
			"/admin": {
				target: "http://127.0.0.1:" + Server_PORT,
			}
		},
		before: app => { }
	},
	// @ts-ignore
	module: {
		rules: [
			...loaders(false)
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})

module.exports = devConfig
