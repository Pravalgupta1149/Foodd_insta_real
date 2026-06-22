const express=require('express')
const app=express()
const dotenv=require('dotenv')
const authroutes=require('./Routes/auth.routes')
const foodroutes=require('./Routes/food.routes')
const foodpartnerroutes=require('./Routes/food-partner.routes')
const cookies=require('cookie-parser')
const cors=require('cors')

app.use(cookies())

dotenv.config()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/api/auth',authroutes)
app.use('/api/food',foodroutes)
app.use('/api/food-partner',foodpartnerroutes)

module.exports=app