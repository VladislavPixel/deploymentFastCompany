import { combineReducers, configureStore } from "@reduxjs/toolkit"
import qualitiesReducer from "./qualities"
import professionReducer from "./profession"
import usersReducer from "./users"
import commentsReducer from "./comments"

const rootReducer = combineReducers({
	qualities: qualitiesReducer,
	profession: professionReducer,
	users: usersReducer,
	comments: commentsReducer
})

export function createStore() {
	return configureStore({
		reducer: rootReducer
	})
}
