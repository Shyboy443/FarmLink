const express = require("express")
const router = express.Router();
const {createProduct} = require("../Controllers/productController")
const {upload}  = require("../Utills/fileupload")


router.post("/",upload.single("image"),createProduct)


module.exports = router