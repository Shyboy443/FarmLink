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


    //Create prduct
    const product = await Product.create({
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



module.exports ={
    createProduct,
}