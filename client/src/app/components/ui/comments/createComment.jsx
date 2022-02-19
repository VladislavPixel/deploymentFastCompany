import React, { useState, useEffect } from "react"
import validator from "../../../utils/validator.js"
import TextAreaField from "../../common/form/textAreaField.jsx"
import { useDispatch, useSelector } from "react-redux"
import { createComment } from "../../../store/comments"
import { getCurrentUserId } from "../../../store/users"
import { useParams } from "react-router-dom"

const CreateComment = () => {
	const { userID } = useParams()
	const currentUserID = useSelector(getCurrentUserId())
	const dispatch = useDispatch()
	const [error, setError] = useState({})
	const [data, setData] = useState({
		content: ""
	})
	const config = {
		content: {
			isRequired: { message: `Поле "Сообщения" должно быть заполнено, для создания комментария` }
		}
	}
	function clearForm() {
		setData({ content: "" })
		setError({})
	}
	function validation() {
		const error = validator(data, config)
		setError(error)
		return Object.keys(error).length === 0
	}
	const handlerChange = (target) => {
		setData((prevState) => {
			return { ...prevState, [target.name]: target.value }
		})
	}
	const handlerSubmit = (event) => {
		event.preventDefault()
		const isValid = validation()
		if (!isValid) {
			return
		}
		dispatch(createComment({ ...data, userId: currentUserID, pageId: userID }))
		clearForm()
	}
	useEffect(() => {
		validation()
	}, [data])
	return (
		<div className="card mb-2">
			<div className="card-body ">
				<h2>New comment</h2>
				<form onSubmit={handlerSubmit}>
					<div className="mb-4">
					</div>
					<div className="mb-4">
						<TextAreaField
							id="content"
							name="content"
							value={data.content}
							label="Сообщение"
							onChange={handlerChange}
							error={error.content}
						/>
					</div>
					<div style={{ textAlign: "right" }}>
						<button className="btn btn-primary">Опубликовать</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export { CreateComment }
