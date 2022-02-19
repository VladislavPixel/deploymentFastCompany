import React from "react"
import { Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { getIsLoggedInStatus } from "../../store/users"

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
	const statusLogged = useSelector(getIsLoggedInStatus())
	return (
		<Route {...rest} render={(props) => {
			if (!statusLogged) return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
			return Component ? <Component {...props} /> : children
		}} />
	)
}

ProtectedRoute.propTypes = {
	component: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	location: PropTypes.object,
	rest: PropTypes.object
}

export default ProtectedRoute
