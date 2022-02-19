import React from "react"
import PropTypes from "prop-types"

const RadioField = ({ options, name, onChange, value, label }) => {
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	return (
		<div className="mb-4">
			<label className="form-label">{label}</label>
			{options.map(item => {
				return (
					<div key={item.value} className="form-check form-check-inline">
						<input
							onChange={handlerChange}
							checked={item.value === value}
							className="form-check-input"
							type="radio"
							name={name}
							id={item.name + "_" + item.value}
							value={item.value}
						/>
						<label
							className="form-check-label"
							htmlFor={item.name + "_" + item.value}
						>
							{item.name}
						</label>
					</div>
				)
			})}
		</div>
	)
}

RadioField.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
	value: PropTypes.string,
	label: PropTypes.string
}

export default React.memo(RadioField)
