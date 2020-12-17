/*
 *      Generic much page project.
 *  FileName:   user.js
 *  Create On:  2020/11/30 21:17
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

import http from "@config/http"

export async function getUsers(){
	return http.get("/admin/user")
}
