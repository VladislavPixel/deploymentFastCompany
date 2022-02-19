const express = require("express")
const chalk = require("chalk")
const router = express.Router({ mergeParams: true })
const Quality = require("../models/Quality")

// /api/quality
router.get("/", async (req, res) => {
	try {
		const qualitiesList = await Quality.find()
		res.status(200).send(qualitiesList)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка получения качеств."))
		res.status(500).json({
			message: "Ошибка сервера. Попробуйте позже."
		})
	}
})

module.exports = router
