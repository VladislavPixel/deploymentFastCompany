import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "./components/ui/header"
import Main from "./layots/main"
import Login from "./layots/login"
import Users from "./layots/users"
import LogOut from "./layots/logOut"
import ProtectedRoute from "./components/common/protectedRoute"
import "react-toastify/dist/ReactToastify.css"
import AppLoader from "./components/ui/HOC/appLoader"

function App() {
	return (
		<div className="app-container">
			<AppLoader>
				<Header />
				<Switch>
					<ProtectedRoute path="/users/:userID?/:edit?" component={Users} />
					<Route path="/login/:type?" component={Login} />
					<Route path="/" component={Main} exact />
					<Route path="/logout" component={LogOut} />
					<Redirect to="/" />
				</Switch>
				<ToastContainer />
			</AppLoader>
		</div>
	)
}

export default App
