import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { getDataStatus, fetchAllUsers } from "../../../store/users"
import Spinner from "../../common/spinner"

const UsersLoader = ({ children }) => {
	const dispatch = useDispatch()
	const dataStatus = useSelector(getDataStatus())
	useEffect(() => {
		if (!dataStatus) {
			dispatch(fetchAllUsers())
		}
	}, [])
	if (!dataStatus) return <Spinner />
	return children
}
UsersLoader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default UsersLoader
