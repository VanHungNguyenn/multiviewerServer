const express = require('express')
const mongoose = require('mongoose')

const createError = require('http-errors')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const multer = require('multer')
const path = require('path')

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

// DB configs
const db = process.env.MONGO_URI

app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(db, (err) => {
	if (err) throw err
	console.log('Connected to mongodb')
})

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name)
	},
})

const upload = multer({ storage: storage })

app.use('/api/post', require('./routes/postRouter'))
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/category', require('./routes/categoryRouter'))
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded')
})

app.use((req, res, next) => {
	next(createError(404))
})
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		message: err.message,
	})
})

const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
	console.log(`Server is running at website: http://localhost:${PORT}`)
})
