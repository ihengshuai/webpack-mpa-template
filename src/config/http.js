/*
 *      Generic much page project.
 *  FileName:   http.js
 *  Create On:  2020/11/30 21:17
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

import axios from "axios"

const config = {
	timeout: 10000,
	// eslint-disable-next-line no-undef
	baseURL: NODE_ENV === "development" ? `http://${DOMAIN}:${SERVER_PORT}` : "",
	withCredentials: true,
}

const instance = axios.create(config)

instance.interceptors.request.use(config => {
	// token... or 其他...
	return config
}, error => {
	return Promise.reject(error)
})

instance.interceptors.response.use(res => {
	return res
}, error => {
	return Promise.reject(error)
})

export default instance
