const path = require("path")
const log4js = require("koa-log4")

log4js.configure({
	appenders: {
		access: {
			type: "dateFile",
			filename: path.resolve(__dirname + "../../../logs/", "access.log"),
			pattern: "-yyyy-MM-dd.log",
		},
		application: {
			type: "dateFile",
			pattern: "-yyyy-MM-dd.log",
			filename: path.resolve(__dirname + "../../../logs/", "application.log")
		},
		out: {
			type: "console"
		},
		stdout: { type: "stdout" }
	},
	categories: {
		default: {appenders: ["stdout", "out"], level: "info"},
		access: {appenders: ["access"], level: "info"},
		application: {appenders: ["application"], level: "WARN"}
	}
})

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger("access"))
exports.logger = log4js.getLogger("application")

