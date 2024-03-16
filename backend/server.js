const express  = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userManage = require("./routes/userManage");


const PORT  = process.env.PORT || 2001;
const app  = express()
const FRONTEND_URL = process.env.FRONTEND_URL

// Middlewares


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());



// Route Middleware




//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(userManage);

//Conntect to mongoDB and Start the Server


mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{
            app.listen(PORT,()=>{
                console.log("Mongo DB Connected");
                console.log(`Server Running on Port ${PORT}`);
            })
        })