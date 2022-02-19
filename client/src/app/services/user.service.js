import httpService from "./http.service"

const userEndPoint = "user/"

const userService = {
	fetchAll: async () => {
		const res = await httpService.get(userEndPoint)
		return res.data
	},
	getUser: async (id) => {
		const { data } = await httpService.get(userEndPoint + id)
		return data
	},
	updateUser: async (newDataUser) => {
		const { data } = await httpService.patch(userEndPoint + newDataUser._id, newDataUser)
		return data
	}
}

export default userService
