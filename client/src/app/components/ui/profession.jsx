import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { getProfessionById } from "../../store/profession"

const Profession = ({ id }) => {
	const profession = useSelector(getProfessionById(id))
	if (!profession) {
		return "loading..."
	} else {
		return <p>{profession.name}</p>
	}
}

Profession.propTypes = {
	id: PropTypes.string
}

export default Profession
