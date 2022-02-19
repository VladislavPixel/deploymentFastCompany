const express = require("express")
const chalk = require("chalk")
const Profession = require("../models/Profession")
const router = express.Router({ mergeParams: true })

// /api/profession
router.get("/", async (req, res) => {
	try {
		const professionList = await Profession.find()
		res.status(200).send(professionList)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка получения списка профессий."))
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже."
		})
	}
})

module.exports = router