const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  getAllProduct
} = require("../Controllers/productController");
const { upload } = require("../Utills/fileupload");
const { authenticate} = require('../middleware/authMiddleware');

router.post("/", authenticate,upload.single("image"), createProduct);
router.patch("/:id", authenticate, upload.single("image"), updateProduct);
router.delete("/:id", authenticate,deleteProduct);
router.get("/all", authenticate, getAllProduct);
router.get("/",  getProduct);
router.get("/:id", authenticate, getSingleProduct);

module.exports = router;
