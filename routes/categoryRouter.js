const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')

const auth = require('../middlewares/auth')

router.post('/create', auth, categoryCtrl.create)
router.get('/all', categoryCtrl.getAll)
router.put('/update/:id', auth, categoryCtrl.updatePostById)
router.delete('/delete/:id', auth, categoryCtrl.deletePostById)

module.exports = router
