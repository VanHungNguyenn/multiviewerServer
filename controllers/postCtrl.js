const Post = require('../models/PostModel')

const postCtrl = {
	create: async (req, res) => {
		try {
			const { title, username, photo, desc, categories } = req.body

			if (!title || !username || !photo || !desc || !categories) {
				return res.status(400).json({
					message: 'Please provide all required fields',
				})
			}

			const post = new Post({
				title,
				username,
				photo,
				desc,
				categories,
			})

			await post.save().then(() => {
				return res.status(200).json({
					message: 'Post created successfully',
				})
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	getAll: async (req, res) => {
		try {
			const posts = await Post.find()

			return res.status(200).json({
				message: 'Posts fetched successfully',
				posts,
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	getPostById: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)

			if (!post) {
				return res.status(404).json({
					message: 'Post not found',
				})
			}

			return res.status(200).json({
				message: 'Post fetched successfully',
				post,
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	updatePostById: async (req, res) => {
		try {
			const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			})

			if (!post) {
				return res.status(404).json({
					message: 'Post not found',
				})
			}

			return res.status(200).json({
				message: 'Post updated successfully',
				post,
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	deletePostById: async (req, res) => {
		try {
			const post = await Post.findByIdAndDelete(req.params.id)

			if (!post) {
				return res.status(404).json({
					message: 'Post not found',
				})
			}

			return res.status(200).json({
				message: 'Post deleted successfully',
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
}

module.exports = postCtrl
