import React from "react"
import Select from "react-select"
import PropTypes from "prop-types"

const MultiSelectField = ({
	options,
	onChange,
	name,
	label,
	value,
	error
}) => {
	const arrayOptions =
		(
			Object.keys(options).map((option) => ({
				value: options[option]._id,
				label: options[option].name
			}))
		)
	function getQualityCurrentUser() {
		const arrayDefaultCurrentUser = []
		for (let i = 0; i < value.length; i++) {
			for (let n = 0; n < arrayOptions.length; n++) {
				if (value[i] === arrayOptions[n].value) {
					arrayDefaultCurrentUser.push(arrayOptions[n])
					break
				}
			}
		}
		return arrayDefaultCurrentUser
	}
	const newDefaultValue = value.length === 1 ? arrayOptions.find(item => item.value === value[0]) : getQualityCurrentUser()
	const handlerChange = (event) => {
		onChange({ name: name, value: event })
	}
	function getClasses() {
		if (error) {
			return " form-select is-invalid"
		}
		return ""
	}
	return (
		<div className="mb-4">
			<label className="form-label">{label}</label>
			<Select
				defaultValue={newDefaultValue}
				closeMenuOnSelect={false}
				name={name}
				onChange={handlerChange}
				isMulti
				options={arrayOptions}
				className={`basic-multi-select${getClasses()}`}
				classNamePrefix="select"
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	)
}

MultiSelectField.propTypes = {
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onChange: PropTypes.func,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.array,
	error: PropTypes.string
}

export default React.memo(MultiSelectField)
