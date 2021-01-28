/*
 *		Generic much page project
 * File Name    : webpack.prod.js
 * Create On    : 2020-08-03 19:30:29
 * Create By    : Peachick <wsm_1105@163.com>
 * Copyright (c) 2019-present github.com/Peachick. All rights reserved.
 */

const webpack = require("webpack")
const { merge } = require("webpack-merge")
const extractCss = require("mini-css-extract-plugin")
const { BASE_CONFIFG, Copyright, resolve, USE_HASH } = require("./webpack.config")
const { loaders } = require("./webpack.loader")

const prodConfig = merge(BASE_CONFIFG, {
	mode: "production",
	output: {
		path: resolve("../client/dist"),
		filename: USE_HASH ? "js/[name].[chunkhash:4].js" : "js/[name].js",
		publicPath: "/",
		chunkFilename: USE_HASH ? "js/[name].[chunkhash:4].js" : "js/[name].js",
	},
	stats: {
		assets: true,
		assetsSort: "size",
		modules: false,
		entrypoints: false,
		chunks: false,
		chunkModules: false,
		colors: true,
	},
	performance: {
		hints: 'warning',
	},
	// @ts-ignore
	module: {
		rules: [
			...loaders(USE_HASH)
		]
	},
	plugins: [
		new extractCss({
			filename: USE_HASH ? "style/[name].[contenthash:4].css" : "style/[name].css",
		}),
		new webpack.BannerPlugin(Copyright),
	],
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			minChunks: 2,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: false,
			cacheGroups: {
				vender: {
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					minSize: 0,
					minChunks: 2,
					priority: -10,
					name: "vendor"
				},
				common: {
					chunks: "all",
					minSize: 20000,
					minChunks: 2,
					name: "common",
					priority: -20,
				}
			}
		}
	}
})

module.exports = prodConfig
