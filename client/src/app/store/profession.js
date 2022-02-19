import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/profession.service"
import { isOutDated } from "../utils/isOutDated"

const initialState = {
	entities: null,
	isLoading: true,
	error: null,
	lastFetch: null
}

const professionSlice = createSlice({
	name: "profession",
	initialState,
	reducers: {
		professionRecived(state, action) {
			state.entities = action.payload
			state.lastFetch = Date.now()
			state.isLoading = false
		},
		professionRequested(state) {
			state.isLoading = true
		},
		professionRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		}
	}
})

// Actions
export function fetchAllProfessions() {
	return async (dispatch, getState) => {
		const { lastFetch } = getState().profession
		if (isOutDated(lastFetch)) {
			dispatch(professionRequested())
			try {
				const { content } = await professionService.fetchAll()
				dispatch(professionRecived(content))
			} catch (error) {
				dispatch(professionRequestFailed(error.message))
			}
		}
	}
}

// Selectors
export function getLoadingProfession() {
	return (state) => {
		return state.profession.isLoading
	}
}
export function getProfessionsData() {
	return (state) => {
		return state.profession.entities
	}
}
export function getProfessionById(id) {
	return (state) => {
		if (state.profession.entities) {
			return state.profession.entities.find(prof => prof._id === id)
		}
	}
}

const { actions, reducer: professionReducer } = professionSlice
const { professionRecived, professionRequested, professionRequestFailed } = actions

export default professionReducer
