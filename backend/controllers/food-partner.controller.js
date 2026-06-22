const foodpartnermodel = require('../db/models/foodpartner.model')
const foodmodel=require('../db/models/food.model')


async function getfoodpartnerbyid(req, res) {

    const foodpartnerid = req.params.id
    try {

        const foodpartner = await foodpartnermodel.findById(foodpartnerid).select('-password')

            const fooditembyfoodpartner=await foodmodel.find({foodpartner:foodpartnerid})

        if (!foodpartner) {
            return res.status(404).json({ message: 'Food Partner not found' })
        }
        res.status(200).json({ foodpartner
            :{
                ...foodpartner.toObject(),
                fooditem:fooditembyfoodpartner
            }
         })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = { getfoodpartnerbyid }