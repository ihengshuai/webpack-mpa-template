import Home from "../views/Home"
import User from "../views/User"
import NotFound from "../views/NotFound"

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/user",
		component: User,
	},
	{
		path: "*",
		component: NotFound
	}
]

export default routes
