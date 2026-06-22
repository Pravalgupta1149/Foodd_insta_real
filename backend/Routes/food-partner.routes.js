const Route = require('express').Router();
const { userauthmiddleware } = require('../middleware/auth.middleware')
const { getfoodpartnerbyid } = require('../controllers/food-partner.controller')
// Get Food Partner by ID api get /api/food-partner/:id
Route.get('/:id', userauthmiddleware, getfoodpartnerbyid)

module.exports = Route