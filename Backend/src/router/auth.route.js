const express = require('express')
const router = express.Router()
const MIDDLEWARE = require('../middle/auths')
const CONTROLLERS = require('../controllers/auths.con')

router.post('/register', MIDDLEWARE.validateData, CONTROLLERS.RegisterUser)
router.post('/login', CONTROLLERS.Login)


module.exports = router