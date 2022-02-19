import httpService from "./http.service"

const qualityEndPoint = "quality/"

const qualityService = {
	fetchAll: async () => {
		const { data } = await httpService.get(qualityEndPoint)
		return data
	}
}

export default qualityService
