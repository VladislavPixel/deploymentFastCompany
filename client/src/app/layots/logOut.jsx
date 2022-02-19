import React, { useEffect } from "react"
import Spinner from "../components/common/spinner"
import { useDispatch } from "react-redux"
import { logOut } from "../store/users"

const LogOut = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(logOut())
	}, [])
	return <Spinner />
}

export default LogOut
