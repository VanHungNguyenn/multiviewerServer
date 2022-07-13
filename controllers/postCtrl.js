const Post = require('../models/PostModel')
const slugify = require('slugify')

const postCtrl = {
	create: async (req, res) => {
		try {
			const { title, username, photo, content, categories, photoAvatar } =
				req.body

			if (
				!title ||
				!username ||
				!photo ||
				!content ||
				!categories ||
				!photoAvatar
			) {
				return res.status(400).json({
					message: 'Please provide all required fields',
				})
			}

			const slug = slugify(title, { lower: true })

			const post = new Post({
				title,
				username,
				photo,
				content,
				categories,
				photoAvatar,
				slug,
			})

			await post.save().then(() => {
				return res.status(200).json({
					post,
					message: 'Post created successfully',
				})
			})
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	getAll: async (req, res) => {
		try {
			const username = req.query.username
			const category = req.query.category

			let posts

			if (username) {
				posts = await Post.find({ username })
			} else if (category) {
				posts = await Post.find({
					categories: {
						$in: [category],
					},
				})
			} else {
				posts = await Post.find()
			}

			return res.status(200).json({
				message: 'Posts fetched successfully',
				posts,
			})
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	getPostBySlug: async (req, res) => {
		try {
			const post = await Post.findOne({ slug: req.params.slug })

			if (!post) {
				return res.status(404).json({
					message: 'Post not found',
				})
			}

			return res.status(200).json({
				message: 'Post fetched successfully',
				post,
			})
		} catch (error) {
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
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	getRelatedPosts: async (req, res) => {
		try {
			let post = await Post.findOne({ slug: req.params.slug })

			if (!post) {
				return res.status(404).json({
					message: 'Post not found',
				})
			}

			const categories = post.categories

			let posts = await Post.find({
				categories: {
					$in: categories,
				},
			})

			posts = posts
				.filter((post) => {
					return post.slug.toString() !== req.params.slug
				})
				.slice(0, 3)

			return res.status(200).json({
				message: 'Posts fetched successfully',
				posts,
			})
		} catch (error) {
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
		} catch (error) {
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
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
}

module.exports = postCtrl
