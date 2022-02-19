import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import validator from "../../../utils/validator.js"
import { useSelector } from "react-redux"
import { getAuthError } from "../../../store/users"

const FormComponent = ({ children, defaultData, config, onSubmit }) => {
	const errorAuth = useSelector(getAuthError())
	const [data, setData] = useState(defaultData || {})
	const [error, setError] = useState({}) // Errors State
	const validation = useCallback((data) => {
		const errors = validator(data, config)
		setError(errors)
		return Object.keys(errors).length === 0
	}, [validator, config, setError])
	const handlerChange = useCallback((target) => {
		setData((prevState) => {
			return { ...prevState, [target.name]: target.value }
		})
	}, [setData])
	const handlerKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault()
			const form = event.target.form
			const indexTarget = Array.prototype.indexOf.call(form, event.target)
			form[indexTarget + 1].focus()
		}
	}
	const handlerSubmit = async (event) => {
		event.preventDefault()
		const isValid = validation()
		if (!isValid) {
			return
		}
		const newData = ((data.qualities && typeof data.qualities[0] === "object") ? { ...data, qualities: data.qualities.map((item) => item.value) } : data)
		try {
			await onSubmit(newData)
		} catch (error) {
			console.log(error.response.data.error.message)
		}
	}
	const isValid = Object.keys(error).length === 0
	useEffect(() => {
		validation(data)
	}, [data])
	const newChildren = React.Children.map(children, (child) => {
		let newConfigChild
		if (typeof child.type === "object") {
			newConfigChild = {
				...child.props,
				value: data[child.props.name],
				error: error[child.props.name],
				onKeyDown: handlerKeyDown,
				onChange: handlerChange
			}
		}
		if (child.type === "button") {
			if (child.props.type === undefined || child.props.type === "submit") {
				newConfigChild = {
					...child.props,
					disabled: !isValid
				}
			}
		}
		return React.cloneElement(child, newConfigChild)
	})
	return (
		<form onSubmit={handlerSubmit}>
			{errorAuth && <div style={{ color: "red", fontSize: "20px", margin: "0px 0px 10px 0px" }}>{errorAuth}</div>}
			{newChildren}
		</form>
	)
}

FormComponent.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	defaultData: PropTypes.object,
	config: PropTypes.object,
	onSubmit: PropTypes.func
}

export default FormComponent
