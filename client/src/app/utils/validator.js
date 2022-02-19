function validator(data, config) {
	const errorsList = {}
	function validate(method, data, config) {
		let statusValidate
		switch (method) {
		case "isRequired":
			if (typeof data === "boolean") {
				statusValidate = !data === true
			} else if (typeof data === "object") {
				statusValidate = Object.keys(data).length === 0
			} else {
				statusValidate = data.trim() === ""
			}
			break
		case "isEmail": {
			const emailRegExp = /^\S+@\S+\.\S+$/g
			statusValidate = !emailRegExp.test(data)
			break
		}
		case "isCapitalSymbol":
			{
				const capitalRegExp = /[A-Z]+/g
				statusValidate = !capitalRegExp.test(data)
			}
			break
		case "isContainDigit":
			{
				const containDigit = /\d+/g
				statusValidate = !containDigit.test(data)
			}
			break
		case "min":
			statusValidate = data.length < config.value
			break
		default:
			break
		}
		if (statusValidate) return config.message
	}
	for (const fieldName in data) {
		for (const validateMethod in config[fieldName]) {
			const error = validate(
				validateMethod,
				data[fieldName],
				config[fieldName][validateMethod]
			)
			if (error && !errorsList[fieldName]) {
				errorsList[fieldName] = error
			}
		}
	}

	return errorsList
}

export default validator
