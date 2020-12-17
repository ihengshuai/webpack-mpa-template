/*
 *		Generic much page project
 * File Name    : webpack.config.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */


const fs = require("fs")
const path = require("path")
const glob = require("glob")
const webpack = require("webpack")
const package = require("../package.json")
const copyWebpackPlugin = require("copy-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const htmlWebpackPlugin = require("html-webpack-plugin")
const terminalNotice = require("friendly-errors-webpack-plugin")
const { Client, Server } = require("../config")

const isProd = process.env.NODE_ENV === "production" ? true : false

const PORT = Client.PORT || process.env.PORT || 9696

const entryName = "entry"

const Copyright = `
	\t\t${package.name || "Generic much page project"}
	Create On    : ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
	Create By    : ${package.author || "Peachick <wsm_1105@163.com>"}
	Copyright (c) 2019-present ${package.repository}. All rights reserved.
`

const resolve = (filePath, ...paths) => {
	return path.resolve(__dirname, filePath, ...paths)
}


// 获取HTMLPlugin集合和多入口
const htmlPlugins = []
function getEntry(entryPath){
	let entry = {}
	glob.sync(resolve(entryPath)).forEach(filePath => {
		let fileFolder = filePath.match(/\/pages\/(.+)\/*.js/)[1]
		entry[fileFolder] = resolve(filePath)

		let reg = new RegExp(`${entryName}$`, "g")
		let htmlPath = filePath.slice(0, filePath.lastIndexOf("/") + 1)
		let htmlName = fileFolder.replace(reg, "")
		let isPUG = fs.existsSync(resolve(htmlPath, "index.pug"))
		htmlPlugins.push(
			new htmlWebpackPlugin({
				title: "",
				template: resolve(htmlPath, isPUG ? "index.pug" : "index.html"),
				filename: htmlName === "" ? "index.html" : (htmlName + "index.html"),
				inject: true,
				chunks: [fileFolder, "vendor", "common"],
				minify: isProd ? {
					removeAttributeQuotes: true,
					collapseBooleanAttributes: true,
					html5: true,
					removeComments: true,
					minifyCSS: true,
					minifyJS: true,
					preserveLineBreaks: true
				} : null,
			})
		)
	})
	return entry
}


// 公共配置
const BASE_CONFIFG = {
	entry: getEntry(`../src/pages/**/${entryName}.js`),
	resolve: {
		modules: [resolve("../node_modules")],
		extensions: [".js", ".vue", ".json", ".css", ".jsx"],
		alias: {
			"@": resolve("../src"),
			"@assets": resolve("../src/assets"),
			"@components": resolve("../src/components"),
			"@layout": resolve("../src/layout"),
			"@pages": resolve("../src/pages"),
			"@util": resolve("../src/util"),
			"@style": resolve("../src/style"),
			"@request": resolve("../src/request"),
			"@config": resolve("../src/config"),
		}
	},
	externals: {
		jquery: "jQuery",
		popper: "popper.js"
	},
	module: {
		noParse: /jQuery/,
	},
	plugins: [
		...htmlPlugins,
		new VueLoaderPlugin(),
		new copyWebpackPlugin({
			patterns: [
				{
					from: resolve("../public"),
					to: resolve("../dist")
				}
			]
		}),
		new terminalNotice({
			compilationSuccessInfo: {
				messages: [`Your application is running here http://localhost:${PORT}`],
				notes: ["Some additionnal notes to be displayed unpon successful compilation"],
			},
			clearConsole: true,
			onErrors: (severity, errors) => {
				// ...
			}
		}),
	]
}


module.exports = {
    PORT,
		BASE_CONFIFG,
		htmlPlugins,
		Copyright,
		resolve,
		Server_PORT: Server.PORT
}
