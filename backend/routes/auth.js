const express = require('express')
const {signup, signin, signout, isAuth} = require('../controllers/authController')
const { signupValidator } = require('../middlewares/authValidator')
const router = express.Router()

router.post('/signup', signupValidator, signup)
router.post('/signin', signin)
router.get('/profile', isAuth)
router.post('/signout', signout)

module.exports = router