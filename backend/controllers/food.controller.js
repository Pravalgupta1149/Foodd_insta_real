const foodmodel = require('../db/models/food.model')
const storageService = require('../services/storage.service')
const { v4: uuidv4 } = require('uuid')

async function createFood(req, res) {
    console.log('foodpartner:', req.foodpartner);
    console.log('file:', req.file);

    console.log('body:', req.body);

    try {
        const imageUploadResponse = await storageService.uploadfile(req.file.buffer, uuidv4());
        // console.log('Image uploaded successfully:', imageUploadResponse);

        const fooditem = await foodmodel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            foodpartner: req.foodpartner._id,
            vedio: imageUploadResponse.url
        });

        res.status(201).json({ message: 'Food created successfully', food: fooditem });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Failed to create food', error: error.message });
    }
}

async function getFood(req, res) {
    try {
        const fooditem = await foodmodel.find({})
        res.status(200).json({ message: 'Food fetched successfully', food: fooditem })
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch food', error: error.message })
    }
}

module.exports = { createFood, getFood }