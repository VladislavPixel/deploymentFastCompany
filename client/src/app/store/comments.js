import { createSlice, createAction } from "@reduxjs/toolkit"
import commentService from "../services/comment.service"

const initialState = {
	entities: null,
	isLoading: true,
	error: null
}

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		commentsRequestField(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
		commentsRecived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		commentsRequested(state) {
			state.isLoading = true
		},
		commentsDeleted(state, action) {
			const newState = [...state.entities]
			state.entities = newState.filter(el => el._id !== action.payload)
		},
		commentsCreated(state, action) {
			state.entities.unshift(action.payload)
		}
	}
})

const { actions, reducer: commentsReducer } = commentsSlice
const { commentsCreated, commentsDeleted, commentsRequested, commentsRequestField, commentsRecived } = actions

const deletedCommentRequested = createAction("comments/deletedCommentsRequested")
const deletedCommentRequestField = createAction("comments/deletedCommentRequestField")
const createdCommentRequested = createAction("comments/createdCommentRequested")
const createdCommentRequestField = createAction("comments/createdCommentRequestField")
// Actions
export function deletedCommentById(id) {
	return async (dispatch) => {
		dispatch(deletedCommentRequested())
		try {
			await commentService.removeComment(id)
			dispatch(commentsDeleted(id))
		} catch (error) {
			dispatch(deletedCommentRequestField())
		}
	}
}
export function createComment(newComment) {
	return async (dispatch) => {
		dispatch(createdCommentRequested())
		const newPayload = { ...newComment }
		try {
			const { content } = await commentService.create(newPayload)
			dispatch(commentsCreated(content))
		} catch (error) {
			dispatch(createdCommentRequestField(error.message))
		}
	}
}
export function loadCommentList(userID) {
	return async (dispatch) => {
		dispatch(commentsRequested())
		try {
			const { content } = await commentService.getComments(userID)
			dispatch(commentsRecived(content))
		} catch (error) {
			dispatch(commentsRequestField(error.message))
		}
	}
}
// Selectors
export function getComments() {
	return (state) => {
		return state.comments.entities
	}
}
export function getCommentsStatusLoading() {
	return (state) => {
		return state.comments.isLoading
	}
}

export default commentsReducer
