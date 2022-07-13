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
		photoAvatar: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', postSchema)
