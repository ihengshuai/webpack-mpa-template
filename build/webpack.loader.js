/*
 *		Generic much page project
 * File Name    : webpack.loader.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */

const { resolve } = require("./webpack.config")
const extractCss = require("mini-css-extract-plugin")
const eslintFormatter = require("eslint-friendly-formatter")
const { Client } = require("../config")

// rules
const loaders = (USE_HASH = false) => {
	return [
		{
			test: /\.(js|jsx)/,
			loader: "eslint-loader",
			enforce: "pre",
			options: {
				formatter: eslintFormatter
			},
			exclude: /node_modules/,
			include: [resolve("../src")]
		},
		{
			test: /\.(js|jsx)$/,
			loader: "babel-loader?cacheDirectory=true"
		},
		{
			test: /\.vue$/,
			loader: "vue-loader",
		},
		{
			test: /\.pug$/,
			use: [
				"raw-loader",
				{
					loader: "pug-html-loader",
					options: {
						data: {
							PROJECT_TITLE: Client.PROJECT_TYPE,
							SERVICE_RUN_MODE: Client.SERVICE_RUN_MODE,
						},
						basedir: resolve("../client/src")
					}
				}
			]
		},
		{
			test: /\.css$/,
			use: [
				USE_HASH ? extractCss.loader : "style-loader",
				"css-loader",
				"postcss-loader"
			]
		},
		{
			test: /\.s(a|c)ss$/,
			use: [
				USE_HASH ? extractCss.loader : "style-loader",
				"css-loader",
				"postcss-loader",
				"sass-loader"
			]
		},
		{
			test: /(png|jpe?g|webp|gif)$/,
			loader: "url-loader",
			options: {
				limit: 10 * 1024 * 1024,
				outputPath: "image",
				name: USE_HASH ? "[name].[hash:4].[ext]" : "[name].[ext]",
				esModule: false
			},
		},
		{
			test: /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)??$/,
			loader: "url-loader",
			options: {
				limit: 20 * 1024 * 1024,
				outputPath: "fonts",
				name: USE_HASH ? "[name].[hash:4].[ext]" : "[name].[ext]",
				esModule: false
			}
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: "url-loader",
			options: {
				limit: 51200,
				outputPath: "medias",
				name: USE_HASH ? "[name].[hash:4].[ext]" : "[name].[ext]",
				esModule: false
			}
		}
	]
}


module.exports = {
	loaders,
}
