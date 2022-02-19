import { createSlice, createAction } from "@reduxjs/toolkit"
import { randomInt } from "../utils/randomInt"
import userService from "../services/user.service"
import authService from "../services/auth.service"
import localStorageService from "../services/localStorage.service"
import history from "../utils/history"
import { generateAuthError } from "../utils/generateAuthError"

const initialState = (localStorageService.getAccessToken() ? {
	entities: null,
	isLoading: true,
	error: null,
	auth: {
		userId: localStorageService.getUserID(),
		isLoggedIn: true
	},
	dataLoaded: false
} : {
	entities: null,
	isLoading: false,
	error: null,
	auth: {
		userId: null,
		isLoggedIn: false
	},
	dataLoaded: false
})

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		usersRecived(state, action) {
			state.entities = action.payload
			state.dataLoaded = true
			state.isLoading = false
		},
		usersRequested(state) {
			state.isLoading = true
		},
		usersRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		authRequestSuccess(state, action) {
			state.auth = { ...action.payload, isLoggedIn: true }
		},
		authRequestFailed(state, action) {
			state.error = action.payload
		},
		userLoggedOut(state) {
			state.entities = null
			state.auth.userId = null
			state.auth.isLoggedIn = false
			state.dataLoaded = false
		},
		userCurrentUpdated(state, action) {
			const index = state.entities.findIndex(item => item._id === action.payload._id)
			state.entities[index] = action.payload
		},
		authRequested(state) {
			state.error = null
		}
	}
})

const { actions, reducer: usersReducer } = usersSlice
const { authRequested, userCurrentUpdated, userLoggedOut, authRequestSuccess, authRequestFailed, usersRecived, usersRequested, usersRequestFailed } = actions

// add Actions
const userUpdateFailed = createAction("users/userUpdateFailed")
const userUpdateRequested = createAction("users/userUpdateRequested")

// Actions
export function updateCurrentUser(newDataUser) {
	return async (dispatch, getState) => {
		const currentUserId = getState().users.auth.userId
		dispatch(userUpdateRequested())
		try {
			const { content } = await userService.updateUser(newDataUser)
			dispatch(userCurrentUpdated(content))
			history.replace(`/users/${currentUserId}`)
		} catch (error) {
			dispatch(userUpdateFailed(error.message))
		}
	}
}
export function logOut() {
	return (dispatch) => {
		localStorageService.removeAuthData()
		console.log("Вышел из аккаунта")
		dispatch(userLoggedOut())
		history.push("/")
	}
}
export function signIn(dataForm, redirectValue) {
	return async (dispatch) => {
		const { email, password } = dataForm
		dispatch(authRequested())
		try {
			const data = await authService.signIn(email, password)
			localStorageService.setTokens(data)
			dispatch(authRequestSuccess({ userId: data.userId }))
			history.push(redirectValue)
		} catch (error) {
			const { code, message } = error.response.data.error
			if (code === 400) {
				const errorMessage = generateAuthError(message)
				dispatch(authRequestFailed(errorMessage))
			} else {
				dispatch(authRequestFailed(message))
			}
		}
	}
}
export function signUp(dataRegisterForm) {
	const payload = {
		...dataRegisterForm,
		completedMeetings: randomInt(0, 200),
		rate: randomInt(1, 5),
		bookmark: false,
		img: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`
	}
	return async (dispatch) => {
		dispatch(authRequested())
		try {
			const data = await authService.signUp(payload)
			localStorageService.setTokens(data)
			dispatch(authRequestSuccess({ userId: data.userId }))
			history.push("/users")
		} catch (error) {
			const { code, message } = error.response.data.error
			if (code === 400) {
				const errorMessage = generateAuthError(message)
				dispatch(authRequestFailed(errorMessage))
			} else {
				dispatch(authRequestFailed(message))
			}
		}
	}
}
export function fetchAllUsers() {
	return async (dispatch) => {
		dispatch(usersRequested())
		try {
			const { content } = await userService.fetchAll()
			dispatch(usersRecived(content))
		} catch (error) {
			dispatch(usersRequestFailed(error.message))
		}
	}
}

// Selectors
export function getUserById(id) {
	return (state) => {
		if (state.users.entities) {
			return state.users.entities.find(item => item._id === id)
		}
	}
}
export function getUsersData() {
	return (state) => {
		return state.users.entities
	}
}
export function getIsLoggedInStatus() {
	return (state) => {
		return state.users.auth.isLoggedIn
	}
}
export function getDataStatus() {
	return (state) => {
		return state.users.dataLoaded
	}
}
export function getCurrentUserId() {
	return (state) => {
		return state.users.auth.userId
	}
}
export function getCurrentUser() {
	return (state) => {
		if (state.users.entities) {
			return state.users.entities.find(el => el._id === state.users.auth.userId)
		}
	}
}
export function getStatusUsersLoading() {
	return (state) => {
		return state.users.isLoading
	}
}
export function getAuthError() {
	return (state) => {
		return state.users.error
	}
}
export default usersReducer
