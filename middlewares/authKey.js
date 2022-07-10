const authKey = (req, res, next) => {
	try {
		const key = req.query.key

		if (!key) {
			return res.status(400).json({ message: 'No Authentication' })
		}

		if (key !== process.env.AUTH_KEY) {
			return res.status(400).json({ message: 'Invalid Authentication' })
		}

		next()
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
