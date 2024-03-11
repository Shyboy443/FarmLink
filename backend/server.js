const express  = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()



const PORT  = process.env.PORT || 2001;
const app  = express()
const FRONTEND_URL = process.env.FRONTEND_URL

// Middlewares


app.use(express.json())
app.use(express.urlencoded({extended:false}))



// Route Middleware




//Routes


//Conntect to mongoDB and Start the Server


mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{
            app.listen(PORT,()=>{
                console.log("Mongo DB Connected");
                console.log(`Server Running on Port ${PORT}`);
            })
        })