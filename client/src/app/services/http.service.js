import axios from "axios"
import { toast } from "react-toastify"
import configFile from "../config.json"
import authService from "./auth.service"
import localStorageService from "../services/localStorage.service"

const http = axios.create({
	baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(async function (config) {
	const expiresDate = localStorageService.getTokenExpiresDate()
	const refreshToken = localStorageService.getRefreshToken()
	const isExpired = refreshToken && expiresDate < Date.now()
	if (configFile.isFarebase) {
		const containSlash = /\/$/gi.test(config.url)
		config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json"
		if (isExpired) {
			const data = await authService.refreshToken()
			localStorageService.setTokens({
				expiresIn: data.expires_in,
				idToken: data.id_token,
				localId: data.user_id,
				refreshToken: data.refresh_token
			})
		}
		const jwtToken = localStorageService.getAccessToken()
		if (jwtToken) {
			config.params = { ...config.params, auth: jwtToken }
		}
	} else {
		if (isExpired) {
			const data = await authService.refreshToken()
			localStorageService.setTokens(data)
		}
		const accessToken = localStorageService.getAccessToken()
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`
			}
		}
	}
	return config
}, (error) => {
	return Promise.reject(error)
})

function transformData(data) {
	return (data && data._id ? data : data && !data._id ? Object.keys(data).map(key => data[key]) : [])
}
http.interceptors.response.use((res) => {
	if (configFile.isFarebase) {
		res.data = { content: transformData(res.data) }
	}
	res.data = { content: res.data }
	return res
}, function (error) {
	const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500
	if (!expectedErrors) {
		toast.info("Something was wrong. Try it later")
		toast.error("Unexpected Errors")
		console.log("Unexpected Errors")
	}
	return Promise.reject(error)
})

const httpService = {
	get: http.get,
	put: http.put,
	post: http.post,
	delete: http.delete,
	patch: http.patch,
	options: http.options
}

export default httpService
