import React, { useState } from "react"
import FormComponent, { TextField, CheckboxField } from "../common/form"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signIn } from "../../store/users"

const LoginForm = () => {
	const history = useHistory()
	const [data] = useState({ email: "", password: "", stayOn: false }) // data state
	const dispatch = useDispatch()
	const validatorConfig = {
		email: {
			isRequired: { message: "Электронная почта обязательна для заполнения" },
			isEmail: { message: "Email введен не корректно" }
		},
		password: {
			isRequired: { message: "Пароль обязателен для заполнения" },
			isCapitalSymbol: {
				message: "Пароль должен содержать хотя бы одну заглавную букву"
			},
			isContainDigit: { message: "Пароль должен содержать хотябы одну цифру" },
			min: { message: "Минимальное количество символов 8", value: 8 }
		}
	}
	const handlerSubmit = (dataForm) => {
		const redirect = history.location.state ? history.location.state.from.pathname : "/"
		dispatch(signIn(dataForm, redirect))
	}
	return (
		<FormComponent onSubmit={handlerSubmit} config={validatorConfig} defaultData={data} >
			<TextField
				label="Электронная почта"
				name="email"
				autoFocus
			/>
			<TextField
				label="Пароль"
				type="password"
				name="password"
			/>
			<CheckboxField name="stayOn">stay on system</CheckboxField>
			<button className="btn btn-primary w-100 mx-auto">
				Submit
			</button>
		</FormComponent>
	)
}

export default LoginForm
