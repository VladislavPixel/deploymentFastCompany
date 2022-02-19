import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadQualitiesList } from "../../../store/qualities"
import { fetchAllProfessions } from "../../../store/profession"
import { getIsLoggedInStatus, fetchAllUsers, getStatusUsersLoading } from "../../../store/users"
import Spinner from "../../common/spinner"

const AppLoader = ({ children }) => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(getIsLoggedInStatus())
	const isLoadingStatusUsers = useSelector(getStatusUsersLoading())
	useEffect(() => {
		dispatch(loadQualitiesList())
		dispatch(fetchAllProfessions())
		if (isLoggedIn) {
			dispatch(fetchAllUsers())
		}
	}, [isLoggedIn])
	if (isLoadingStatusUsers) return <Spinner />
	return children
}

AppLoader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default AppLoader
