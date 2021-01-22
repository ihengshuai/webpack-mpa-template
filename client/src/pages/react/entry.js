import React from "react"
import { HashRouter as Router } from "react-router-dom"
import ReactDom from "react-dom"
import App from "./App"


ReactDom.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>
	,
	document.querySelector("#app")
)
