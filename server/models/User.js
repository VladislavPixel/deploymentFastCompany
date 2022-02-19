const { Schema, model } = require("mongoose")

const schema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true // уникальный email для каждого пользователя
	},
	password: {
		type: String,
		required: true
	},
	completedMeetings: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	rate: {
		type: Number,
		required: true
	},
	sex: {
		type: String,
		enum: ["male", "female", "other"] // В поле sex у нас возможно одно из трех значений
	},
	profession: {
		type: Schema.Types.ObjectId, // Здесь будет находиться ссылка на id объекта который уже есть в базе
		ref: "Profession", // Имя коллекции с которой мы устанавливаем связь
	},
	qualities: [{ // Потенциально качеств может быть множество и для них у нас устанавливается массив
		type: Schema.Types.ObjectId,
		ref: "Quality",
	}]
}, {
	timestamps: true
})

module.exports = model("User", schema)
