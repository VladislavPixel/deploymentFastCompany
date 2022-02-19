import React, { useEffect } from "react"
import Quality from "./quality"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import {
	getCorrectQualitiesForUser,
	getQualitiesLoadingStatus,
	loadQualitiesList
} from "../../../store/qualities"

const QualitiesList = ({ qualities }) => {
	const dispatch = useDispatch()
	const loading = useSelector(getQualitiesLoadingStatus())
	const qualitiesData = useSelector(getCorrectQualitiesForUser(qualities))
	useEffect(() => {
		dispatch(loadQualitiesList())
	}, [])
	return (
		<React.Fragment>
			{(loading && <span>Loading...</span>) || qualitiesData.map(qual => <Quality key={qual._id} {...qual} />)}
		</React.Fragment>
	)
}

QualitiesList.propTypes = {
	qualities: PropTypes.array.isRequired
}

export default QualitiesList
