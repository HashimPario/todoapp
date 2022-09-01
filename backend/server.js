require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const app = express()
app.use(express.json())
app.use(cors())



// Routes
app.use('/user', require('./routes/userRouter'))


mongoose.connect('mongodb+srv://hashim:hashim123@cluster0.iuzyi.mongodb.net/todoApp?retryWrites=true&w=majority',{
    
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,    

}).then(()=>{
    console.log(`connected to mongodb`)
       
}).catch((err)=>{
    console.log(`connection not Successful`)
})





app.use('/',(req,res,next)=>{
    res.json({msg: "Hello Todos"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})