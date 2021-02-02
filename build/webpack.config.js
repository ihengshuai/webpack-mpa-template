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
const ora = require("ora")
const chalk = require("chalk")
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
function getEntry(entryPath) {
	let entry = {}
	glob.sync(resolve(entryPath)).forEach(filePath => {
		let fileFolder = filePath.match(/\/pages\/(.+)\/*.js/)[1]
		entry[fileFolder] = resolve(filePath)
		let relativeReg = /(\.\.)*/g
		let relativePath = path.relative(filePath, resolve("../client/src/pages"))
		let relativePathArr = relativePath.match(relativeReg).filter(item => item.length).slice(1)
		let relativePrefix = relativePathArr.reduce((p, c) => p + c + "/", "")

		let reg = new RegExp(`${entryName}$`, "g")
		let htmlPath = filePath.slice(0, filePath.lastIndexOf("/") + 1)
		let htmlName = fileFolder.replace(reg, "")
		let isPUG = fs.existsSync(resolve(htmlPath, "index.pug"))
		htmlPlugins.push(
			new htmlWebpackPlugin({
				title: Client.PROJECT_TYPE,
				template: resolve(htmlPath, isPUG ? "index.pug" : "index.html"),
				filename: htmlName === "" ? "index.html" : (htmlName + "index.html"),
				inject: true,
				publicPath: Client.SERVICE_RUN_MODE ? "/" : relativePrefix,
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


const spinner = ora(chalk.hex("#436EEE").bold(`Building for ${process.env.NODE_ENV}...`))
spinner.start()

// 公共配置
const BASE_CONFIFG = {
	entry: getEntry(`../client/src/pages/**/${entryName}.js`),
	resolve: {
		modules: [resolve("../node_modules")],
		extensions: [".js", ".vue", ".json", ".css", ".jsx"],
		alias: {
			"@": resolve("../client/src"),
			"@assets": resolve("../client/src/assets"),
			"@components": resolve("../client/src/components"),
			"@layout": resolve("../client/src/layout"),
			"@pages": resolve("../client/src/pages"),
			"@util": resolve("../client/src/util"),
			"@style": resolve("../client/src/style"),
			"@api": resolve("../client/src/api"),
			"@config": resolve("../client/src/config"),
		}
	},
	externals: {
		// jquery: "jQuery",
		// popper: "popper.js"
	},
	module: {
		noParse: /jQuery/,
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			DOMAIN: JSON.stringify(Client.DOMAIN),
			PORT: JSON.stringify(Client.PORT),
			SERVER_PORT: JSON.stringify(Server.PORT),
			USER_TOKEN_COOKIE_NAME: JSON.stringify(Client.USER_TOKEN_COOKIE_NAME),
			AUTH_CODE_COOKIE_NAME: JSON.stringify(Client.AUTH_CODE_COOKIE_NAME),
		}),
		...htmlPlugins,
		new VueLoaderPlugin(),
		new copyWebpackPlugin({
			patterns: [
				{
					from: resolve("../client/public"),
					to: resolve("../client/dist")
				}
			]
		}),
		new terminalNotice({
			// @ts-ignore
			compilationSuccessInfo: {
				messages: [`Your application is running the url ☞ ${chalk.blue.underline('http://' + Client.DOMAIN + ':' + PORT)}`],
			},
			clearConsole: true,
			onErrors: (severity, errors) => {
				// ...
			}
		}),
	],
}


module.exports = {
	PORT,
	BASE_CONFIFG,
	htmlPlugins,
	Copyright,
	resolve,
	SERVICE_RUN_MODE: Client.SERVICE_RUN_MODE,
	USE_HASH: Client.USE_HASH,
	DOMAIN: Client.DOMAIN,
	Server_PORT: Server.PORT,
	OPEN_BROWER: Client.OPEN_BROWER,
}
