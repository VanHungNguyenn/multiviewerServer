const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')

const auth = require('../middlewares/auth')

router.post('/create', categoryCtrl.create)
router.get('/all', categoryCtrl.getAll)

module.exports = router
