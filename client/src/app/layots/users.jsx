import React from "react"
import UserPage from "../components/page/userPage"
import UsersListPage from "../components/page/usersListPage"
import { useParams, Redirect } from "react-router-dom"
import EditUserPage from "../components/page/editUser"
import { useSelector } from "react-redux"
import { getCurrentUserId } from "../store/users"
import UsersLoader from "../components/ui/HOC/usersLoade"

const Users = () => {
	const { userID, edit } = useParams()
	const currentUserID = useSelector(getCurrentUserId())
	return (
		<UsersLoader>
			{userID && edit && currentUserID === userID ? (
				<EditUserPage />
			) : userID && edit && currentUserID !== userID ? (
				<Redirect to={`/users/${currentUserID}/edit`} />
			) : userID ? (
				<UserPage />
			) : (
				<UsersListPage />
			)}
		</UsersLoader>
	)
}

export default Users
