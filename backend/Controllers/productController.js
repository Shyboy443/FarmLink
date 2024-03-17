const Product = require("../Models/productModel")
const cloudinary = require("cloudinary").v2
const asyncHnadler = require("express-async-handler")
const {fileSizeFormatter} = require("../Utills/fileupload")

// Add Product 

const  createProduct = asyncHnadler(async (req,res) => {

    const {name,sku,category,quantity,price,description} = req.body


    // Validation
    if(!name|| !category || !quantity || !price || !description ){
        res.status(400)
        throw new Error("Please fill in all fields")

    }
    // Handle Image upload
    let fileData = {};
    if(req.file){

      
        // Save Image to cloudinary

        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder:"FarmLink",
                resource_type:"image",
            })
        } catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded")
        }

      

        fileData = {
            fileName: req.file.originalname, 
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype, 
            fileSize: fileSizeFormatter(req.file.size,2) ,
        }

      

    }


    //Create prduct
    const product = await Product.create({
        user:req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    }) 

    res.status(201).json(product)

})

// Get All products  In DB 

const getAllProduct = asyncHnadler(async (req,res) => {
    const products = await Product.find({}).sort("-createdAt") 
    res.status(200).json(products)
 })

// Get All products 

const getProduct = asyncHnadler(async (req,res) => {
    const products = await Product.find({user:req.user.id}).sort("-createdAt") // getting error since user not created
    res.status(200).json(products)
 })
 
 // Get single product
 
 const getSingleProduct = asyncHnadler(async (req,res) => {
     const product = await Product.findById(req.params.id)
     if(!product){
         // if product doesnt exits
         res.status(404)
         throw new Error("Product not found")
     }
     // match product to its user
     if(product.user.toString() !== req.user.id){
         res.status(401)
         throw new Error("User Not authorized")
     }
     res.status(200).json(product);
 
 
 
 })
 
 
 // Delete Product
 
 const deleteProduct = asyncHnadler(async (req,res) => {
 
     const product = await Product.findById(req.params.id)
     if(!product){
         // if product doesnt exits
         res.status(404)
         throw new Error("Product not found")
     }
     // match product to its user
     if(product.user.toString() !== req.user.id){
         res.status(401)
         throw new Error("User Not authorized")
     }
     await product.deleteOne();
     res.status(200).json({
         message: "Product Deleted"
     });
 
 })
 
 // Update Product
 
 const  updateProduct = asyncHnadler(async (req,res) => {
 
     const {name,category,quantity,price,description} = req.body;
     const {id} = req.params;
 
     const product = await Product.findById(req.params.id)
 
      // if product doesnt exits
     if(!product){
    
         res.status(404)
         throw new Error("Product not found")
 
     }
        // match product to its user
        if(product.user.toString() !== req.user.id){
         res.status(401)
         throw new Error("User Not authorized")
     }
 
 
     // Handle Image upload
     let fileData = {};
 
     if(req.file){
      // Save Image to cloudinary
         let uploadedFile;
         try {
             uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                 folder:"ShyApp1",
                 resource_type:"image",
             })
         } catch (error) {
             res.status(500)
             throw new Error("Image could not be uploaded")
         }
 
 
         fileData = {
             fileName: req.file.originalname, 
             filePath: uploadedFile.secure_url,
             fileType: req.file.mimetype, 
             fileSize: fileSizeFormatter(req.file.size,2) ,
         }
     }
 
 
     //Update product
     const updateProduct = await Product.findByIdAndUpdate(
         {_id: id},
         {
             name,
             category,
             quantity,
             price,
             description,
             image: Object.keys(fileData).length === 0 ? product?.image :fileData ,
         },
         {
             new: true,
             runValidators: true,
         }
     )
 
 
     res.status(200).json(updateProduct)
 
 })
 
 module.exports = {
     createProduct,
     getProduct, 
     getSingleProduct, 
     deleteProduct,
     updateProduct,
     getAllProduct
 }