const express  = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const productRoute = require("./Routes/productRoute")



const PORT  = process.env.PORT || 2001;
const app  = express()
const FRONTEND_URL = process.env.FRONTEND_URL

// Middlewares


app.use(express.json())
app.use(express.urlencoded({extended:false}))



// Route Middleware


app.use("/api/products",productRoute)

//Routes

app.get("/",(req,res)=>{
    res.send("Home page")
})


//Conntect to mongoDB and Start the Server


mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{
            app.listen(PORT,()=>{
                console.log("Mongo DB Connected");
                console.log(`Server Running on Port ${PORT}`);
            })
        })