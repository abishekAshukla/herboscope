const express = require('express')
const {
  registerUser,
  loginUser,
  currentUser,
  postInfo,
  getInfo,
} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router()

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/info').post(postInfo)

router.route('/getinfo').post(getInfo)

router.get('/currentuser', validateToken, currentUser)

module.exports = router
