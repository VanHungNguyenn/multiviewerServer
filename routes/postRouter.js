const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')

const auth = require('../middlewares/auth')

router.post('/create', auth, postCtrl.create)
router.get('/all', postCtrl.getAll)
router.get('/:id', postCtrl.getPostById)
router.delete('/:id', auth, postCtrl.deletePostById)
router.put('/:id', auth, postCtrl.updatePostById)
router.get('/related/:id', postCtrl.getRelatedPosts)

module.exports = router
