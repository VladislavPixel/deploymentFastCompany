const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const chalk = require("chalk")
const Comment = require("../models/Comment")

const router = express.Router({ mergeParams: true })

// /api/comment
router
	.route("/")
		.get(authMiddleware, async (req, res) => {
			try {
				const { orderBy, equalTo } = req.query
				const commentsList = await Comment.find({ [orderBy]: equalTo })
				const sorteredComments = (data) => {
					data.sort((a, b) => {
						const dateA = new Date(a.created_at).getTime()
						const dateB = new Date(b.created_at).getTime()
						return dateB - dateA
					})
				}
				if (commentsList && commentsList.length > 1) {
					sorteredComments(commentsList)
				}
				res.status(200).send(commentsList)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка в получении комментариев."), err.message)
				res.status(500).json({
					message: "Ошибка сервера. Обратитесь позже."
				})
			}
		})
		.post(authMiddleware, async (req, res) => {
			try {
				const newComment = await Comment.create({
					...req.body,
					userId: req.user._id
				})
				res.status(201).send(newComment)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка в создании комментария."), err.message)
				res.status(500).json({
					message: "Ошибка сервера. Обратитесь позже."
				})
			}
		})



router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		const { id } = req.params
		const existingComment = await Comment.findById(id)

		if (existingComment && (req.user._id === existingComment.userId.toString())) {
			await existingComment.remove()
			return res.status(200).send(null)
		} else {
			console.log(chalk.yellow.inverse("Была попытка удаления ресурса пользователем, у которого недостаточно прав."))
			res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
	} catch (err) {
		console.log("Ошибка при удалении комментария.", err.message)
		res.status(500).send({
			message: "Ошибка сервера. Обратитесь к ресурсу позже."
		})
	}
})

module.exports = router
