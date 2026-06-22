const FoodPartnermodel = require('../db/models/foodpartner.model')
const Usermodel = require('../db/models/user.model')
const jwt = require('jsonwebtoken')

async function authfoodpartnermiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodpartner = await FoodPartnermodel.findById(decoded.id)
        if (!foodpartner) {
            return res.status(401).json({ message: 'Unauthorized access for food partner' })
        }
        req.foodpartner = foodpartner
        next()
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized in catch' })
    }
}

async function userauthmiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Usermodel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access for user' })
        }
        req.user = user
        next()
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized in cath' })
    }
}

module.exports = { authfoodpartnermiddleware, userauthmiddleware }