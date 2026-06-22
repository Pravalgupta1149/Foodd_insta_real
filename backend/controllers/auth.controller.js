const mongoose=require('mongoose')
const User=require('../db/models/user.model')
const FoodPartner=require('../db/models/foodpartner.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


async function userregister(req,res) {
    const {name,email,password}=req.body

    try{
        // Check if user already exists
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        // Hash the password
       const hassedPassword= await bcrypt.hash(password,10)
         // Create new user 
        const newUser= new User({
            name,   
            email,
            password:hassedPassword
        })
        await newUser.save()

        const userToken=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        res.cookie('token',userToken,{httpOnly:true})


        res.status(201).json({message:'User registered successfully',token:userToken})
    }catch(err){
        console.error('Error registering user:',err)
        res.status(500).json({message:'Server error'})

    }


}

async function userlogin(req,res) {
    const {email,password}=req.body

    try{
        // Check if user exists
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid credentials'})
        }   

        // Compare password       
         const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }

        const userToken=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.cookie('token',userToken,{httpOnly:true})
        res.json({message:'User logged in successfully',token:userToken})
    }catch(err){
        console.error('Error logging in user:',err)
        res.status(500).json({message:'Server error'})
    }
}

async function userlogout(req,res) {
    res.clearCookie('token')
    res.json({message:'User logged out successfully'})
}

async function foodpartnerregister(req,res) {
    const {name,email,password}=req.body

    try{
        // Check if user already exists
        const existingUser= await FoodPartner.findOne({
            email
        })
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        // Hash the password
       const hassedPassword= await bcrypt.hash(password,10)
         // Create new user
        const newfoodpartner= new FoodPartner({
            name,   
            email,
            password:hassedPassword
        })
        await newfoodpartner.save()

        const userToken=jwt.sign({id:newfoodpartner._id},process.env.JWT_SECRET)
        res.cookie('token',userToken,{httpOnly:true})


        res.status(201).json({message:'Food Partner registered successfully',token:userToken})
    }catch(err){
        console.error('Error registering food partner:',err)
        res.status(500).json({message:'Server error'})

    }


}

async function foodpartnerlogin(req,res) {
    const {email,password}=req.body

    try{
        // Check if user exists
        const foodPartner= await FoodPartner.findOne({email})
        if(!foodPartner){
            return res.status(400).json({message:'Invalid credentials'})
        }

        // Compare password       
         const isMatch= await bcrypt.compare(password,foodPartner.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }

        const foodPartnerToken=jwt.sign({id:foodPartner._id},process.env.JWT_SECRET)
        res.cookie('token',foodPartnerToken,{httpOnly:true})

        res.json({message:'Food Partner logged in successfully',token:foodPartnerToken})   
    }catch(err){
        console.error('Error logging in food partner:',err)
        res.status(500).json({message:'Server error'})
    }
}

async function foodpartnerlogout(req,res) {
    res.clearCookie('token')
    res.json({message:'Food Partner logged out successfully'})
}

module.exports={userregister,userlogin,userlogout,foodpartnerregister,foodpartnerlogin,foodpartnerlogout}