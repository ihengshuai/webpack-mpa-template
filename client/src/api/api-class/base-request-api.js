/* eslint class-methods-use-this: ["error", { "exceptMethods": ["method", "url", "defaultParams", "defaultData"] }] */
import createRequest from "@config/http"

class BaseRequestApi {
	constructor(argObj) {
		// eslint-disable-next-line no-undef
		let baseURL = NODE_ENV === "development" ? `http://${DOMAIN}:${SERVER_PORT}` : ""
		if (argObj && Object.prototype.hasOwnProperty.call(argObj, "baseURL")) {
			baseURL = argObj.baseURL
		}

		let responseType
		if (argObj && Object.prototype.hasOwnProperty.call(argObj, "responseType")) {
			responseType = argObj.responseType
		}

		let headers
		if (argObj && Object.prototype.hasOwnProperty.call(argObj, "headers")) {
			headers = argObj.headers
		}

		this.request = createRequest({
			baseURL: baseURL,
			responseType,
			headers,
		})

		this.targetParams = this.defaultParams()
		this.targetData = this.defaultData()
	}

	get params() {
		return this.targetParams
	}

	set params(value) {
		this.targetParams = value
	}

	get data() {
		return this.targetData
	}

	set data(value) {
		this.targetData = value
	}

	method() {
		return "GET"
	}

	url() {
		return null
	}

	defaultParams() {
		return {}
	}

	defaultData() {
		return {}
	}

	send() {
		return this.request({
			method: this.method(),
			url: this.url(),
			params: this.targetParams,
			data: this.targetData,
		})
	}
}

export default BaseRequestApi
