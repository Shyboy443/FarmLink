import axios from "axios";

const BACKEND_URL = 'http://localhost:5000';


// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/products`, formData);
  return response.data;
  
};
/// Get All Products in the Database

const getAllProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/products/all`);
  return response.data;
  
};

// Get All Products
const getProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/products`);
  console.log(response.data);
  return response.data;
  
};
// Delete a Product
const deleteProducts = async (id) => {
  const response = await axios.delete(`${BACKEND_URL}/api/products/${id}`);
  return response.data;
  
};

// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/products/${id}`);
  return response.data;
};

// Update Product

const updateProducts = async (id, formData) => {
  const response = await axios.patch(`${BACKEND_URL}/api/products/${id}`,formData);
  return response.data;
  
};

 const productService = {
    createProduct,
    getProducts,
    deleteProducts,
    updateProducts,
    getProduct,
    getAllProducts
 }

 export default productService;
