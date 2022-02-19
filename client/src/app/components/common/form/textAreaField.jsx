import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({ id, name, value, label, onChange, error }) => {
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	const getClasses = () => {
		if (error) {
			return " is-invalid"
		}
		return " is-valid"
	}
	return (
		<React.Fragment>
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<textarea
				className={`form-control${getClasses()}`}
				id={id}
				name={name}
				value={value}
				onChange={handlerChange}
				rows="3"
			></textarea>
			{error && <div className="invalid-feedback">{error}</div>}
		</React.Fragment>
	)
}

TextAreaField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string
}

export default React.memo(TextAreaField)
