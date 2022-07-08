const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', postSchema)
