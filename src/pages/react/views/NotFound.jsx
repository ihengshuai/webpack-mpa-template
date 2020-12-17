import React from "react"
import { Link, useRouteMatch } from "react-router-dom"

const NotFound = () => {
	const match = useRouteMatch()

	return (
		<div>
			{match.url} : 404， 你访问的页面不存在
			<div><Link to="/"></Link></div>
		</div>
	)
}

export default NotFound
