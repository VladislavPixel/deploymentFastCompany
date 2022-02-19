import React, { useState } from "react"
import PropTypes from "prop-types"

const TextField = ({
	label,
	type,
	name,
	value,
	onChange,
	error,
	placeholder,
	...rest
}) => {
	const [showPassword, setShowPassword] = useState(false)
	function getInputClasses() {
		return "form-control" + (error ? " is-invalid" : "")
	}
	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState)
	}
	const handlerChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>
			<div className="input-group has-validation">
				<input
					placeholder={placeholder}
					type={showPassword ? "text" : type}
					id={name}
					value={value}
					onChange={handlerChange}
					name={name}
					className={getInputClasses()}
					{...rest}
				/>
				{type === "password" && (
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={toggleShowPassword}
					>
						<i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
					</button>
				)}
				{(error && <div className="invalid-feedback">{error}</div>) || null}
			</div>
		</div>
	)
}

TextField.defaultProps = {
	type: "text",
	placeholder: ""
}
TextField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
	placeholder: PropTypes.string
}

export default React.memo(TextField)
