import axios from "axios"
import { getRefreshToken } from "./localStorage.service"
import config from "../config.json"

// Firebase: https://identitytoolkit.googleapis.com/v1/
// params: {
// 	key: process.env.REACT_APP_FIREBASE_KEY
// }

export const httpAuth = axios.create({
	baseURL: config.apiEndPoint + "auth/"
})

const authService = {
	signUp: async (payload) => {
		const { data } = await httpAuth.post("signUp", payload)
		return data
	},
	signIn: async (email, password) => {
		const { data } = await httpAuth.post("signInWithPassword", { email, password })
		return data
	},
	refreshToken: async () => {
		const { data } = await httpAuth.post("token", { refresh_token: getRefreshToken() })
		return data
	}
}

export default authService
