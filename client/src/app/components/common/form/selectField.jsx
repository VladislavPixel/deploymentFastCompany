import React from "react"
import PropTypes from "prop-types"

const SelectField = ({
	label,
	name,
	value,
	onChange,
	defaultOption,
	options,
	error
}) => {
	function getSelectClass() {
		if (error) {
			return " is-invalid"
		}
		return " is-valid"
	}
	const optionsArray =
		(!Array.isArray(options) &&
			typeof options === "object" &&
			Object.keys(options).map((optionName, ind, arr) => {
				return {
					name: options[optionName].name,
					_id: options[optionName]._id
				}
			})) ||
		options
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	return (
		<div className="mb-4">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<select
				name={name}
				id={name}
				value={value}
				onChange={handlerChange}
				className={`form-select${getSelectClass()}`}
			>
				<option disabled value="">
					{defaultOption}
				</option>
				{optionsArray &&
					optionsArray.map((item) => {
						return (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						)
					})}
			</select>
			{(error && <div className="invalid-feedback">{error}</div>) || null}
		</div>
	)
}

SelectField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	defaultOption: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	error: PropTypes.string
}

export default React.memo(SelectField)
