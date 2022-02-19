import React from "react"
import PropTypes from "prop-types"

const CompletedMeetingsCard = ({ completedMeetings }) => {
	return (
		<div className="card mb-3">
			<div className="card-body d-flex flex-column justify-content-center text-center">
				<h5 className="card-title">
					<span>Completed meetings</span>
				</h5>
				<h1 className="display-1">{completedMeetings}</h1>
			</div>
		</div>
	)
}

CompletedMeetingsCard.propTypes = {
	completedMeetings: PropTypes.number
}

export default CompletedMeetingsCard
