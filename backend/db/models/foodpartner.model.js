const moongoose=require('mongoose')

const foodPartnerSchema=new moongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const foodPartner=moongoose.model('FoodPartner',foodPartnerSchema)
module.exports=foodPartner