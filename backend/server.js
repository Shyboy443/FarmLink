const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); // From the second snippet

// Import routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userManage = require("./routes/userManage");
const productRoute = require("./Routes/productRoute");
const feedbackRouter = require("./routes/feedbacks"); // From the second snippet

const PORT = process.env.PORT || 2001;
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL; // Assuming this is used somewhere not shown in the snippets
const MONGODB_URL = process.env.MONGO_URI || process.env.MONGODB_URL; // Support both variable names

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Additional middleware from the second snippet
app.use(bodyParser.json()); // Note: express.json() does the same as bodyParser.json() in newer Express versions

// Route Middleware

// Routes from Profile_Management branch
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(userManage);
app.use("/api/products", productRoute);

// Route from the second snippet
app.use("/feedback", feedbackRouter);

// Route from main branch
app.get("/", (req, res) => {
    res.send("Home page");
});

// Connect to MongoDB and start the server
mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
