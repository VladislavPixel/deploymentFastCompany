import React from "react"
import PropTypes from "prop-types"

const CheckboxField = ({ name, value, onChange, children, error }) => {
	const handlerChange = () => {
		onChange({ name: name, value: !value })
	}
	const getClasses = () => {
		if (error) {
			return " is-invalid"
		}
		return " is-valid"
	}
	return (
		<div className="form-check mb-4">
			<input
				checked={value}
				name={name}
				onChange={handlerChange}
				className={`form-check-input${getClasses()}`}
				type="checkbox"
				value=""
				id={name}
			/>
			<label className="form-check-label" htmlFor={name}>
				{children}
			</label>
			{error ? <div className="invalid-feedback">{error}</div> : null}
		</div>
	)
}

CheckboxField.propTypes = {
	name: PropTypes.string,
	value: PropTypes.bool,
	onChange: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	error: PropTypes.string
}

export default React.memo(CheckboxField)
