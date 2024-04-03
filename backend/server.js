const express  = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const productRoute = require("./Routes/productRoute")
const appointmentRoutes = require('./Routes/appointmentRoute');



const PORT  = process.env.PORT || 5000;

const app  = express()
const FRONTEND_URL = process.env.FRONTEND_URL

// Middlewares

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))



// Route Middleware


app.use("/api/products",productRoute)
app.use("/appointments",appointmentRoutes)

//Routes

app.get("/",(req,res)=>{
    res.send("Home page")
})

//nohhh


//Conntect to mongoDB and Start the Server

mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(PORT, () => {
            console.log("Mongo DB Connected");
            console.log('Server Running on Port', PORT);
        });
    });