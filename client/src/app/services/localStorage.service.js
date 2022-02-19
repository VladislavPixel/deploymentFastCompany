const TOKEN_KEY = "accessToken"
const REFRESH_KEY = "refreshToken"
const EXPIRES_KEY = "expiresInAccessToken"
const LOCAL_ID = "userId"

export function setTokens({ expiresIn = 3600, accessToken, userId, refreshToken }) {
	const expiresDate = new Date().getTime() + (expiresIn * 1000)
	localStorage.setItem(TOKEN_KEY, accessToken)
	localStorage.setItem(REFRESH_KEY, refreshToken)
	localStorage.setItem(EXPIRES_KEY, expiresDate)
	localStorage.setItem(LOCAL_ID, userId)
}

export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpiresDate() {
	return localStorage.getItem(EXPIRES_KEY)
}

export function getUserID() {
	return localStorage.getItem(LOCAL_ID)
}

export function removeAuthData() {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(REFRESH_KEY)
	localStorage.removeItem(EXPIRES_KEY)
	localStorage.removeItem(LOCAL_ID)
}

const localStorageService = {
	setTokens,
	getAccessToken,
	getRefreshToken,
	getTokenExpiresDate,
	getUserID,
	removeAuthData
}

export default localStorageService
