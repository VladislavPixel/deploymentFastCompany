const chalk = require("chalk")
const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const initDataBase = require("./startUp/initDatabase")
const router = require("./routes")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use("/api", router) // глобал router

// if Heroku deploy = process.env.PORT || 3000
const PORT = config.get("port") ? config.get("port") : 8080

if (process.env.NODE_ENV === "production") {
	console.log("Production mode")
	const pathBaseStatic = path.join(__dirname, "client")
	app.use("/", express.static(pathBaseStatic))

	const indexPath = path.join(pathBaseStatic, "index.html")
	app.get("*", () => {
		res.sendFile(indexPath)
	})
} else {
	console.log("Development mode")
}

async function start() {
	try {
		mongoose.connection.once("open", () => {
			initDataBase()
		})
		await mongoose.connect(config.get("mongoUri"))
		console.log(chalk.green.inverse("MongoDB connected success"))
		app.listen(PORT, () => {
			console.log(chalk.green.inverse(`Server has been started on port: ${PORT}`))
		})
	} catch (err) {
		console.log("Error: ", err.message)
		console.log(chalk.red.inverse("Ошибка с подключением"))
		process.exit(1)
	}
}

start()

