const BASE_URL = "http://localhost:5001/api";

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products/all`);
  return await response.json();
}

async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return await response.json();
}

async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  return await response.json();
}

async function updateProduct(id, productData) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  return await response.json();
}

async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
