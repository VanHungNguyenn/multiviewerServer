const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

const auth = require('../middlewares/auth')
// all
router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/infor', auth, userCtrl.getInfor)

module.exports = router
