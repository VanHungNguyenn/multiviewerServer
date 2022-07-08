const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '365d',
	})
}

const userCtrl = {
	register: async (req, res) => {
		try {
			const { username, password, email } = req.body

			if (!username || !password || !email) {
				return res.status(400).json({
					message: 'Please provide all required fields',
				})
			}

			if (password.length < 6) {
				return res.status(400).json({
					message: 'Password must be at least 6 characters',
				})
			}

			const user = await User.findOne({ username })

			if (user) {
				return res.status(400).json({
					message: 'Username already exists',
				})
			}

			const hashPawssword = await bcrypt.hash(password, 12)

			const newUser = new User({
				username,
				password: hashPawssword,
				email,
			})

			await newUser.save().then(() => {
				return res.status(200).json({
					message: 'User created successfully',
				})
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
	login: async (req, res) => {
		try {
			const { username, password } = req.body

			if (!username || !password) {
				return res.status(400).json({
					message: 'Please provide all required fields',
				})
			}

			const user = await User.findOne({ username })

			if (!user) {
				return res.status(400).json({
					message: 'Username does not exist',
				})
			}

			const isValidPassword = await bcrypt.compare(
				password,
				user.password
			)

			if (!isValidPassword) {
				return res.status(400).json({
					message: 'Invalid password',
				})
			}

			const payload = {
				id: user._id,
				username: user.username,
			}

			const accessToken = createAccessToken(payload)

			return res.status(200).json({
				message: 'Login successful',
				accessToken,
			})
		} catch (err) {
			return res.status(500).json({
				message: error.message,
			})
		}
	},
}

module.exports = userCtrl
