const express = require("express")
const bcrypt = require("bcryptjs")
const chalk = require("chalk")
const User = require("../models/User")
const { generateUserData } = require("../utils/helpers.data")
const tokenServices = require("../services/token.services")
const { check, validationResult } = require("express-validator")

const router = express.Router({ mergeParams: true })

// /api/auth
router.post("/signUp", [
	check("email", "Некорректный email!").isEmail(),
	check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: "INVALID_DATA",
						code: 400,
						errors: errors.array()
					}
				})
			}
			const { email, password } = req.body
			const existingUser = await User.findOne({ email: email })
			if (existingUser) {
				return res.status(400).json({
					error: {
						message: "EMAIL_EXISTS",
						code: 400
					}
				})
			}
			const hashedPassword = await bcrypt.hash(password, 12)

			const newUser = await User.create({
				...generateUserData(),
				...req.body,
				password: hashedPassword,
			})
			const tokens = tokenServices.generateToken({ _id: newUser._id })
			await tokenServices.save(newUser._id, tokens.refreshToken)

			res.status(201).send({ ...tokens, userId: newUser._id })
		} catch (err) {
			console.log(chalk.red.inverse("Ошибка регистрации"), err.message)
			res.status(500).json({
				message: "Ошибка сервера. Обратитесь позже."
			})
		}
	}
])

router.post("/signInWithPassword", [
	check("email", "Email имеет некорректную запись").isEmail(),
	check("password", "Поле пароль должно быть заполнено").exists(),
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: "INVALID_DATA",
						code: 400,
						errors: errors.array()
					}
				})
			}
			const { email, password } = req.body
			const existingUser = await User.findOne({ email: email })
			if (!existingUser) {
				return res.status(400).send({
					error: {
						message: "EMAIL_NOT_FOUND",
						code: 400
					}
				})
			}

			const isPasswordEqual = await bcrypt.compare(password, existingUser.password)

			if (!isPasswordEqual) {
				return res.status(400).send({
					error: {
						message: "INVALID_PASSWORD",
						code: 400
					}
				})
			}

			const tokens = tokenServices.generateToken({ _id: existingUser._id })
			await tokenServices.save(existingUser._id, tokens.refreshToken)


			res.status(201).send({...tokens, userId: existingUser._id})
		} catch (err) {
			console.log(chalk.red.inverse("Ошибка авторизации"), err.message)
			res.status(500).json({
				message: "Ошибка сервера. Обратитесь позже."
			})
		}
	}
])

router.post("/token", async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body
		const data = tokenServices.validateRefresh(refreshToken)
		const dbToken = await tokenServices.findToken(refreshToken)
		if (!data || !dbToken || (data._id !== dbToken?.userId?.toString())) {
			return res.status(401).json({
				message: "Unauthorized"
			})
		}
		const tokens = tokenServices.generateToken({ _id: data._id })
		await tokenServices.save(data._id, tokens.refreshToken)

		res.status(201).send({...tokens, userId: data._id})
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка рефрешинга токена"), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Попробуйте позже."
		})
	}
})

module.exports = router
