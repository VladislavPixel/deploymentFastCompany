import React, { useState } from "react"
import FormComponent, { TextField, SelectField, RadioField, MultiSelectField, CheckboxField } from "../common/form"
import { useSelector, useDispatch } from "react-redux"
import { getQualities } from "../../store/qualities"
import { getProfessionsData } from "../../store/profession"
import { signUp } from "../../store/users"

const RegisterForm = () => {
	const dispatch = useDispatch()
	const qualities = useSelector(getQualities())
	const professions = useSelector(getProfessionsData())
	const [data] = useState({
		qualities: ["61f7ad5db1a08b5a4c5960e8"],
		sex: "male",
		name: "",
		email: "",
		password: "",
		profession: "",
		license: false
	}) // data state
	const validatorConfig = {
		email: {
			isRequired: {
				message: "Электронная почта обязательна для заполнения"
			},
			isEmail: { message: "Email введен не корректно" }
		},
		name: {
			isRequired: {
				message: "Имя обязательно для заполнения"
			},
			min: { message: "Минимальное количество символов 4", value: 4 }
		},
		password: {
			isRequired: { message: "Пароль обязателен для заполнения" },
			isCapitalSymbol: {
				message: "Пароль должен содержать хотя бы одну заглавную букву"
			},
			isContainDigit: {
				message: "Пароль должен содержать хотябы одну цифру"
			},
			min: { message: "Минимальное количество символов 8", value: 8 }
		},
		profession: {
			isRequired: { message: "Профессию обязательно нужно выбрать" }
		},
		license: {
			isRequired: { message: "license agreement is required" }
		},
		qualities: {
			isRequired: { message: "qualities is req..." }
		}
	}
	const handlerSubmit = (data) => {
		dispatch(signUp(data))
		console.log("Регистрация пройдена!")
	}
	return (
		<FormComponent onSubmit={handlerSubmit} config={validatorConfig} defaultData={data}>
			<TextField
				label="Имя"
				name="name"
				autoFocus
			/>
			<TextField
				label="Электронная почта"
				name="email"
			/>
			<TextField
				label="Пароль"
				type="password"
				name="password"
			/>
			<SelectField
				label="SELECTED is your profession"
				options={professions}
				defaultOption="Choose..."
				name="profession"
			/>
			<RadioField
				label="Selected sex field:"
				name="sex"
				options={[
					{ name: "Male", value: "male" },
					{ name: "Female", value: "female" },
					{ name: "Other", value: "other" }
				]}
			/>
			<MultiSelectField
				label="Selected qualities is your"
				name="qualities"
				options={qualities}
			/>
			<CheckboxField
				name="license"
			>
				Сonfirm <a>license</a> agreement
			</CheckboxField>
			<button className="btn btn-primary w-100 mx-auto">
				Submit
			</button>
		</FormComponent>
	)
}

export default RegisterForm
