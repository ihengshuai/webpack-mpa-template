import React from "react"
import "./style/index.scss"
import { Switch, Route } from "react-router-dom"
import routes from "./router"
import Nav from "./components/Nav"

export default function App() {
	return (
		<div>
			<h2 className="react-notice">React SPA Demo</h2>

			<Nav />

			<Switch>
				{routes.map((route, index) => {
					return	<Route
										key={route.path + index}
										exact={route.exact === false ? false : true} 
										component={route.component} 
										path={route.path} 
									/>
				})}
			</Switch>


			<div className="backHome" onClick={() => location.href = "/"}>回应用首页</div>
		</div>
	)
}
