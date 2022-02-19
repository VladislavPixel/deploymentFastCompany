import { useState, useEffect } from "react"
import professions from "../mockData/professions.json"
import qualities from "../mockData/qualities.json"
import users from "../mockData/users.json"
import httpService from "../services/http.service"

const useMockData = () => {
	const statusConsts = {
		idle: "Not Started", // загрузка не началась
		pending: "In Process",
		successed: "Ready",
		error: "Error occured"
	}
	const [error, setError] = useState(null) // для ошибок
	const [status, setStatus] = useState(statusConsts.idle) // для определения статуса
	const [progress, setProgress] = useState(0) // для вывода прогресса в процентах
	const [count, setCount] = useState(0) // для проверки какое количество запрсов улетело
	const summuryCount = professions.length + qualities.length + users.length
	const handlerIncrementCount = () => {
		setCount(prevState => prevState + 1)
	}
	const handlerUpdateProgress = () => {
		if (count !== 0 && status === statusConsts.idle) {
			setStatus(() => statusConsts.pending)
		}
		const newProgress = Math.floor((count / summuryCount) * 100)
		if (progress < newProgress) {
			setProgress(() => newProgress)
		}
		if (count === summuryCount) {
			setStatus(() => statusConsts.successed)
		}
	}
	useEffect(() => {
		handlerUpdateProgress()
	}, [count])
	async function initialize() {
		try {
			for (const prof of professions) {
				await httpService.put("profession/" + prof._id, prof)
				handlerIncrementCount()
			}
			for (const quality of qualities) {
				await httpService.put("quality/" + quality._id, quality)
				handlerIncrementCount()
			}
			for (const user of users) {
				await httpService.put("user/" + user._id, user)
				handlerIncrementCount()
			}
		} catch (error) {
			setError(error)
			setStatus(() => statusConsts.error)
		}
	}
	return { error, initialize, progress, status }
}

export default useMockData
