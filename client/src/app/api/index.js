import users, { getUserOnId, updateUser } from "./fake.api/user.api"
import professions from "./fake.api/professions.api"
// import professionsObject from "./fake.api/professions.api"
import qualities from "./fake.api/qualities.api.js"
import commentsMethods from "./fake.api/comments.api.js"

const API = {
	users,
	updateUser,
	getUserOnId,
	professions,
	qualities,
	commentsMethods
}
export default API
