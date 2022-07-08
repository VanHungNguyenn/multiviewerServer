const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')

const auth = require('../middlewares/auth')

router.post('/create', auth, categoryCtrl.create)
router.get('/all', auth, categoryCtrl.getAll)

module.exports = router
