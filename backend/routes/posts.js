const express = require('express')
const { addPost, postById, showPost, allPosts, updatePost, postPhoto } = require('../controllers/postController')
const multer = require('multer')
const { requireSignIn } = require('../middlewares/auth')
const uploadMiddlware = multer({dest: 'uploads/'})
const router = express.Router()

router.post('/', addPost)
router.get('/:postId', showPost)
router.put('/:postId', requireSignIn, updatePost)
router.get('/', allPosts)
router.get('/photo/:postId', postPhoto)

router.param('postId', postById)

module.exports = router