const Category = require('../models/CategoryModel')

const categoryCtrl = {
	create: async (req, res) => {
		try {
			const { name } = req.body

			if (!name) {
				return res.status(400).json({
					message: 'Please provide all required fields',
				})
			}

			const category = new Category({
				name,
			})

			await category.save().then(() => {
				return res.status(200).json({
					message: 'Category created successfully',
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
			const categories = await Category.find()

			return res.status(200).json({
				message: 'Categories fetched successfully',
				categories,
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
}

module.exports = categoryCtrl
