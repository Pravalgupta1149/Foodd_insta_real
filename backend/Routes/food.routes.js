const routes = require('express').Router()
const authmiddleware = require('../middleware/auth.middleware')
const foodcontroller = require('../controllers/food.controller')
const multer = require('multer')
const path = require('path')
const fs = require('fs')



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

routes.post('/', authmiddleware.authfoodpartnermiddleware, upload.single('video'), foodcontroller.createFood)

routes.get('/', authmiddleware.userauthmiddleware, foodcontroller.getFood)


module.exports = routes