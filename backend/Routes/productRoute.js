const express = require("express")
const router = express.Router();
const {createProduct, updateProduct , deleteProduct , getProduct , getSingleProduct, getAllProduct} = require("../Controllers/productController")
const {upload}  = require("../Utills/fileupload")


router.post("/"/*,protect*/,upload.single("image"),createProduct)
router.patch("/:id"/*,protect*/,upload.single("image"),updateProduct)
router.get("/all",getAllProduct)
router.get("/"/*,protect*/,getProduct)
router.get("/:id"/*,protect*/,getSingleProduct)
router.delete("/:id"/*,protect*/,deleteProduct)

module.exports = router