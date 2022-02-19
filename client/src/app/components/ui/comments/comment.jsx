import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { getUserById, getCurrentUserId } from "../../../store/users"
import PropTypes from "prop-types"
import ImageSnippet from "../../common/imageSnippet"
import getDate from "../../../utils/displayDate"

const Comment = ({ content, userId, _id, onDelete, created_at }) => {
	const { name, image } = useSelector(getUserById(userId))
	const currentUserID = useSelector(getCurrentUserId())
	const [statusDate, setStatusDate] = useState(getDate(created_at))
	const idInterval = useRef(null)
	useEffect(() => {
		const id = setInterval(() => {
			const newStatusDate = getDate(created_at)
			setStatusDate(newStatusDate)
		}, 60020)
		idInterval.current = id
		return () => clearInterval(idInterval.current)
	}, [])
	return (
		<div className="bg-light card-body mb-3">
			<div className="row">
				<div className="col">
					<div className="d-flex flex-start ">
						<ImageSnippet
							width="65"
							height="65"
							alt="avatar"
							classes="rounded-circle shadow-1-strong me-3"
							urlQuery={image}
						/>
						<div className="flex-grow-1 flex-shrink-1">
							<div className="mb-4">
								<div className="d-flex justify-content-between align-items-center">
									<p className="mb-1">
										{`${name} ${statusDate}`}
										<span className="small"></span>
									</p>
									{userId === currentUserID &&
										<button className="btn btn-sm text-primary d-flex align-items-center">
											<i
												onClick={() => {
													onDelete(_id)
												}}
												className="bi bi-x-lg"
											></i>
										</button>
									}
								</div>
								<p className="small mb-0">{content}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Comment.propTypes = {
	content: PropTypes.string,
	userId: PropTypes.string,
	_id: PropTypes.string,
	onDelete: PropTypes.func,
	created_at: PropTypes.string
}

export { Comment }
