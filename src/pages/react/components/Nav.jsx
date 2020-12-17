import React from "react"
import { Link } from "react-router-dom"

const Nav = () => {
	return (
		<div className="react-nav">
			<Link className="nav-item" to="/">React Home</Link>
			<Link className="nav-item" to="/user">React User</Link>
			<Link className="nav-item" to="/admin">React 404 Route</Link>
		</div>
	)
}

export default Nav
