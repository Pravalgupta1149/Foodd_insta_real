const app=require('./app')
const connectDB=require('./db/dbconnection')

connectDB()
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
// restarted