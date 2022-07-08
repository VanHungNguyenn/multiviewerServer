const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')

const auth = require('../middlewares/auth')

router.post('/create', auth, postCtrl.create)
router.get('/all', auth, postCtrl.getAll)
router.get('/:id', auth, postCtrl.getPostById)
router.delete('/:id', auth, postCtrl.deletePostById)
router.put('/:id', auth, postCtrl.updatePostById)

module.exports = router
