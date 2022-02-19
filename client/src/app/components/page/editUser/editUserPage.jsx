import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	getQualities,
	getQualitiesLoadingStatus
} from "../../../store/qualities"
import {
	getProfessionsData,
	getLoadingProfession
} from "../../../store/profession"
import { useHistory } from "react-router-dom"
import FormComponent, { TextField, SelectField, RadioField, MultiSelectField } from "../../common/form"
import Spinner from "../../common/spinner"
import { getCurrentUser, updateCurrentUser } from "../../../store/users"

const EditUserPage = () => {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser())
	const history = useHistory()
	const [isLoading, setIsLoading] = useState(true)
	const professionLoading = useSelector(getLoadingProfession())
	const professions = useSelector(getProfessionsData())
	const qualities = useSelector(getQualities())
	const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
	const [data, setData] = useState()
	const handlerBack = () => {
		history.replace(`/users/${currentUser._id}`)
	}
	const configSchema = {
		name: { isRequired: { message: "Имя обязательно для заполнения" } },
		email: {
			isRequired: { message: "Почта обязательна для заполнения" },
			isEmail: { message: "Почта не валидна" }
		},
		profession: { isRequired: { message: "Профессия обязательна для заполнения" } },
		qualities: { isRequired: { message: "qualities is req..." } }
	}
	useEffect(() => {
		if (!professionLoading && !qualitiesLoading && currentUser && !data) {
			setData({
				...currentUser
			})
		}
	}, [professionLoading, qualitiesLoading, currentUser, data])
	useEffect(() => {
		if (data && isLoading) {
			setIsLoading(false)
		}
	}, [data])
	const handlerSubmit = (newData) => {
		dispatch(updateCurrentUser({ ...currentUser, ...newData }))
	}
	return (
		(isLoading && <Spinner />) ||
		<div className="container">
			<button type="button" className="btn btn-primary" onClick={handlerBack}>
				<i className="bi bi-caret-left"></i>
				Назад
			</button>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<FormComponent defaultData={data} config={configSchema} onSubmit={handlerSubmit}>
						<TextField
							label="Имя"
							name="name"
							autoFocus
						/>
						<TextField
							label="Электронная почта"
							name="email"
						/>
						<SelectField
							label="Выберите свою профессию"
							name="profession"
							options={professions}
						/>
						<RadioField
							label="Выберите ваш пол"
							name="sex"
							options={[
								{ value: "male", name: "Male" },
								{ value: "female", name: "Female" },
								{ value: "other", name: "Other" }
							]}
						/>
						<MultiSelectField
							label="Выберите ваши качества"
							name="qualities"
							options={qualities}
						/>
						<button className="w-100 btn btn-primary">
							Обновить
						</button>
					</FormComponent>
				</div>
			</div>
		</div>
	)
}

export default EditUserPage
