import httpService from "./http.service"

const andPointService = "comment/"

const commentService = {
	create: async (payload) => {
		console.log(payload)
		const { data } = await httpService.post(andPointService, payload)
		return data
	},
	getComments: async (pageId) => {
		const { data } = await httpService.get(andPointService, {
			params: {
				orderBy: "pageId",
				equalTo: `${pageId}`
			}
		})
		return data
	},
	removeComment: async (commentId) => {
		const { data } = await httpService.delete(andPointService + commentId)
		return data
	}
}

export default commentService
