import React from "react"
import PropTypes from "prop-types"
import QualitiesList from "./qualities"

const QualitiesCard = ({ qualities }) => {
	return (
		<div className="card mb-3">
			<div className="card-body d-flex flex-column justify-content-center text-center">
				<h5 className="card-title">
					<span>Qualities</span>
				</h5>
				<div className="card-text">
					<QualitiesList qualities={qualities} />
				</div>
			</div>
		</div>
	)
}

QualitiesCard.propTypes = {
	qualities: PropTypes.array
}

export default QualitiesCard
