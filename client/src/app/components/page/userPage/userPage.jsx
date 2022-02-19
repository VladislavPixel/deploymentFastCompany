import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Spinner from "../../common/spinner"
import UserCard from "../../ui/userCard"
import QualitiesCard from "../../ui/qualitiesCard"
import CompletedMeetingsCard from "../../ui/completedMeetingsCard"
import { CreateComment, CommentsList } from "../../ui/comments"
import { useSelector, useDispatch } from "react-redux"
import { getUserById } from "../../../store/users"
import { loadCommentList, getCommentsStatusLoading, getComments, deletedCommentById } from "../../../store/comments"

const UserPage = () => {
	const { userID } = useParams()
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadCommentList(userID))
	}, [userID])
	const isLoading = useSelector(getCommentsStatusLoading())
	const comments = useSelector(getComments())
	const history = useHistory()
	const dataUser = useSelector(getUserById(userID))
	const handlerEditOnPage = () => {
		history.push(`/users/${dataUser._id}/edit`)
	}
	const handlerDeleteComment = (id) => {
		dispatch(deletedCommentById(id))
	}
	return (
		(dataUser &&
		<div className="container">
			<div className="row gutters-sm">
				<div className="col-md-4 mb-3">
					<UserCard onEditPage={handlerEditOnPage} {...dataUser} />
					<QualitiesCard {...dataUser} />
					<CompletedMeetingsCard {...dataUser} />
				</div>
				<div className="col-md-8">
					<CreateComment />
					{isLoading ? <Spinner /> : <CommentsList comments={comments} onDelete={handlerDeleteComment} />}
				</div>
			</div>
		</div>) || <Spinner />
	)
}

export default UserPage
