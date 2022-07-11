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

			const check = await Category.findOne({ name })

			if (check) {
				return res.status(400).json({
					message: 'Category already exists',
				})
			}

			const category = new Category({
				name,
			})

			await category.save().then(() => {
				return res.status(200).json({
					category,
					message: 'Category created successfully',
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
			const categories = await Category.find()

			return res.status(200).json({
				message: 'Categories fetched successfully',
				categories,
			})
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
}

module.exports = categoryCtrl
