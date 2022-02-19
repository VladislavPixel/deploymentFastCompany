import React from "react"
import PropTypes from "prop-types"
import { Comment } from "./comment"

const CommentsList = ({ onDelete, comments }) => {
	return (
		<div className="card mb-3">
			<div className="card-body ">
				<h2>Comments</h2>
				<hr />
				{
					((comments === null || comments.length < 1) && <div style={{ fontSize: "20px", color: "green", fontWeight: 600 }} className="bg-light card-body mb-3">Оставь комментарий</div>) ||
					comments.map((comment) => <Comment key={comment._id} {...comment} onDelete={onDelete} />)
				}
			</div>
		</div>
	)
}

CommentsList.propTypes = {
	onDelete: PropTypes.func,
	comments: PropTypes.array
}

export default CommentsList
