import React, { useState } from "react"
import PropTypes from "prop-types"
const BookMark = ({ status, ...rest }) => {
	const [stateBookmark, setBookmark] = useState(false)
	const handlerToggleBook = () => {
		if (stateBookmark === true) {
			setBookmark(prevState => !prevState)
		} else {
			setBookmark(prevState => !prevState)
		}
	}
	return (
		<button {...rest} onClick={handlerToggleBook}>
			<i className={"bi bi-bookmark" + (stateBookmark ? "-heart-fill" : "")}></i>
		</button>
	)
}
BookMark.propTypes = {
	status: PropTypes.bool
}

export default BookMark
