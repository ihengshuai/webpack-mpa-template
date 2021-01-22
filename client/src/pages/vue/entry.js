/*
 *      Generic much page project.
 *  FileName:   entry.js
 *  Create On:  2020/11/29 20:07
 *  Create By:  Peachick <wsm_1105@163.com>
 *  Copyright (c) 2017-present github.com/Peachick. All rights reserved.
 */

import Vue from "vue"
import App from "./App"
import router from "./router"

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
