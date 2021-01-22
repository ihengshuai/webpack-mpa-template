/*
 *      Generic much page project.
 *  FileName:   auth.js
 *  Create On:  2020/11/30 21:17
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */


import http from "@config/http"

export async function getAuthCode(){
	return http.get("/api/auth/code")
}

export async function userLogin(formData){
	return http.post("/api/auth/user/login", formData)
}

export async function userLogout(){
	return http.get("/api/auth/user/logout")
}
