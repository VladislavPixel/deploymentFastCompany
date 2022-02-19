const tokenServices = require("../services/token.services")

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}
	try {
		const token = req.headers.authorization.split(" ")[1]
		if (!token) {
			return res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
		const data = tokenServices.validateAccessToken(token)
		req.user = data
		next()
	} catch (err) {
		res.status(401).json({
			error: {
				message: "Unauthorized",
				code: 401
			}
		})
	}
}