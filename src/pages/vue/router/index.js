import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Home from "../views/Home"

const routes = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/home",
		component: Home,
		meta: {
			title: "Vue Home"
		}
	},
	{
		path: "/user",
		component: () => import("../views/User.vue"),  // lazy component
		meta: {
			title: "Vue User"
		}
	}
]

const router = new VueRouter({
	mode: "hash",
	routes,
})


router.beforeEach((to, from, next) => {
	// to.meta?.title && (document.title = to.meta.title)
	next()
})

export default router

