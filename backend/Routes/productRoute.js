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

router.post("/",upload.single("image"), createProduct);
router.patch("/:id", upload.single("image"), updateProduct);
router.delete("/:id",deleteProduct);
router.get("/all", getAllProduct);
router.get("/",  getProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
