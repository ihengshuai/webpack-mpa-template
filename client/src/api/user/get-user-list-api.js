/* eslint class-methods-use-this: ["error", { "exceptMethods": ["method", "url"] }] */
/*
 *      Generic much page project.
 *  FileName:   user.js
 *  Create On:  2020/11/30 21:17
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

import BaseRequestApi from "@api/api-class/base-request-api"

export class GetUserListApi extends BaseRequestApi {
	url() {
		return "/api/permission/user"
	}
}

