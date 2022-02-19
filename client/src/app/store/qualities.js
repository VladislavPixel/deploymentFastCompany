import { createSlice } from "@reduxjs/toolkit"
import qualityService from "../services/quality.service"
import { isOutDated } from "../utils/isOutDated"

const initialState = {
	entities: null,
	isLoading: true,
	error: null,
	lastFetch: null
}

const qualitiesSlice = createSlice({
	name: "qualities",
	initialState,
	reducers: {
		qualitiesRecived(state, action) {
			state.entities = action.payload
			state.lastFetch = Date.now()
			state.isLoading = false
		},
		qualitiesRequested(state) {
			state.isLoading = true
		},
		qualitiesRequestFailed(state, action) {
			state.error = action.payload
			state.isLoading = false
		}
	}
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRecived, qualitiesRequested, qualitiesRequestFailed } = actions

// actions Qualities
export function loadQualitiesList() {
	return async (dispatch, getState) => {
		const { lastFetch } = getState().qualities
		if (isOutDated(lastFetch)) {
			dispatch(qualitiesRequested())
			try {
				const { content } = await qualityService.fetchAll()
				dispatch(qualitiesRecived(content))
			} catch (error) {
				dispatch(qualitiesRequestFailed(error.message))
			}
		}
	}
}

// Selectors Qualities
export function getQualities() {
	return (state) => state.qualities.entities
}
export function getQualitiesLoadingStatus() {
	return (state) => state.qualities.isLoading
}
export function getCorrectQualitiesForUser(qualitiesUser) {
	return (state) => {
		if (state.qualities.entities) {
			const newArrayQuality = []
			for (let x = 0; x < qualitiesUser.length; x++) {
				for (let n = 0; n < state.qualities.entities.length; n++) {
					if (qualitiesUser[x] === state.qualities.entities[n]._id) {
						newArrayQuality.push(state.qualities.entities[n])
						break
					}
				}
			}
			return newArrayQuality
		} else {
			return []
		}
	}
}

export default qualitiesReducer
