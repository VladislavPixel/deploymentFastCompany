const jwt = require("jsonwebtoken")
const config = require("config")
const Token = require("../models/Token")

class TokenServices{
	generateToken(payload) {
		const accessToken = jwt.sign(payload, config.get("accessSecret"), {
			expiresIn: "1h"
		})
		const refreshToken = jwt.sign(payload, config.get("refreshSecret"))

		return {
			accessToken,
			refreshToken,
			expiresIn: 3600
		}
	}
	async save(userId, refreshToken) {
		const data = await Token.findOne({ userId: userId })
		if (data) {
			data.refreshToken = refreshToken
			return data.save()
		}
		const toketRef = await Token.create({ userId, refreshToken })
		return toketRef
	}
	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, config.get("refreshSecret"))
		} catch (err) {
			return null
		}
	}
	validateAccessToken(accessToken) {
		try {
			return jwt.verify(accessToken, config.get("accessSecret"))
		} catch (err) {
			return null
		}
	}
	async findToken(refreshToken) {
		try {
			return await Token.findOne({ refreshToken: refreshToken })
		} catch (err) {
			console.log("Ошибка поиска Токена", err.message)
			return null
		}
	}

}

module.exports = new TokenServices()