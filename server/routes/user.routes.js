const express = require("express")
const chalk = require("chalk")
const router = express.Router({ mergeParams: true })
const User = require("../models/User")
const authMiddleware = require("../middleware/auth.middleware")

// /api/user
router.patch("/:userId", authMiddleware, async (req, res) => {
	try {
		const { userId } = req.params
		const tokenData = req.user
		if (userId === tokenData._id) {
			const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
			res.status(200).send(updatedUser)
		} else {
			res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка при обновлении User."), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

router.get("/", authMiddleware, async (req, res) => {
	try {
		const usersList = await User.find()
		res.status(200).send(usersList)
	} catch (err) {
		console.log(chalk.red.inverse("Возникла ошибка при получении Users."), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
