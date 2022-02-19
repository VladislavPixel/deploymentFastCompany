const { Schema, model } = require("mongoose")

const schema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	refreshToken: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = model("Token", schema)
