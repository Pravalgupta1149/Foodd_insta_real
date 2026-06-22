const routes=require('express').Router()
const authcontroller=require('../controllers/auth.controller') 

routes.post('/user/register',authcontroller.userregister)
routes.post('/user/login',authcontroller.userlogin)
routes.get('/user/logout',authcontroller.userlogout)

routes.post('/foodpartner/register',authcontroller.foodpartnerregister)
routes.post('/foodpartner/login',authcontroller.foodpartnerlogin)
routes.get('/foodpartner/logout',authcontroller.foodpartnerlogout)
module.exports=routes