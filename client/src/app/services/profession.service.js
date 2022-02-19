import httpService from "./http.service"

const professionEndPoint = "profession/"

const professionService = {
	fetchAll: async () => {
		const res = await httpService.get(professionEndPoint)
		return res.data
	}
}

export default professionService
