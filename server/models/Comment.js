const { Schema, model } = require("mongoose")

const schema = new Schema({
	content: {
		type: String,
		required: true
	},
	pageId: { // Страница конкретного человека, на которой комментарий
		type: Schema.Types.ObjectId, // Тоже выставляем зависимость, так как тут id конкретного user, который есть в БД
		ref: "User",
		required: true
	},
	userId: { // Тот кто оставляет comment
		type: Schema.Types.ObjectId, // Тут тоже связь так как пользователь уже создан в User Collection
		ref: "User",
		required: true
	}
}, {
	timestamps: { createdAt: "created_at" }
})

module.exports = model("Comment", schema)
