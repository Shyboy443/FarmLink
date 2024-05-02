const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  getAllProduct,
  getSingleProductAll,
  getProductByCategory,
  deleteAllProducts,
  getProductsById,
  sendNotificationEmail,
  generateAndDownloadReport
} = require("../Controllers/productController");
const { upload } = require("../Utills/fileupload");
const { authenticate} = require('../middleware/authMiddleware');


router.post("/",upload.single("image"), createProduct);
router.patch("/:id",authenticate, upload.single("image"), updateProduct);
router.delete("/:id",authenticate,deleteProduct);
router.get("/all",authenticate,getAllProduct);
router.get("/", authenticate, getProduct);
router.get("/:id", authenticate, getSingleProductAll);
router.get("/:id",authenticate, getSingleProduct);
router.get('/category/:category',authenticate,getProductByCategory);
router.delete('/products/deleteall', authenticate,deleteAllProducts);
router.get('/user-products/:id',authenticate,getProductsById);
router.post('/send-notification-email', authenticate,sendNotificationEmail);
router.get('/report/generate', generateAndDownloadReport);

module.exports = router;
