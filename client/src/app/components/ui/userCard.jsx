import React from "react"
import ImageSnippet from "../common/imageSnippet.jsx"
import PropTypes from "prop-types"
import Spinner from "../common/spinner.jsx"
import { useSelector } from "react-redux"
import {
	getLoadingProfession,
	getProfessionById
} from "../../store/profession"
import { getCurrentUserId } from "../../store/users"

const UserCard = ({ onEditPage, name, profession, rate, image, _id }) => {
	const loading = useSelector(getLoadingProfession())
	const currentProfessionForUser = useSelector(getProfessionById(profession))
	const currentUserID = useSelector(getCurrentUserId())
	return (
		<div className="card mb-3">
			<div className="card-body">
				{_id === currentUserID &&
					<button
						type="button"
						onClick={onEditPage}
						className="position-absolute top-0 end-0 btn btn-light btn-sm"
					>
						<i className="bi bi-gear"></i>
					</button>
				}
				<div className="d-flex flex-column align-items-center text-center position-relative">
					<ImageSnippet
						width="150"
						height="150"
						urlQuery={image}
						alt="avatar"
						classes="rounded-circle shadow-1-strong me-3"
					/>
					<div className="mt-3">
						<h4>{name}</h4>
						{(loading && <Spinner />) || <p className="text-secondary mb-1">{`Профессия: ${currentProfessionForUser?.name}`}</p>}
						<div className="text-muted">
							<i
								className="bi bi-caret-down-fill text-primary"
								role="button"
							></i>
							<i
								className="bi bi-caret-up text-secondary"
								role="button"
							></i>
							<span className="ms-2">{`Rate: ${rate}`}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

UserCard.propTypes = {
	onEditPage: PropTypes.func,
	profession: PropTypes.string,
	rate: PropTypes.number,
	name: PropTypes.string,
	image: PropTypes.string,
	_id: PropTypes.string
}

export default UserCard
