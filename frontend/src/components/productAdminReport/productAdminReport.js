import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import productService from '../../redux/features/product/ProductService';
import logo from '../../assets/logo.png';
const ProductAdminReport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch all products
        const res = await productService.getAllProducts();
        setProducts(res);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const downloadPdf = () => {
    const doc = new jsPDF();
    const logoImg = logo; 
    const systemEmail = 'FarmLink.Org@outlook.com'; 
    const systemPhone = '0761827545'; 

    // Add logo image to the top right corner
    doc.addImage(logoImg, 'JPEG', 160, 10, 40, 40);

    // Adding system email and phone number in the top left corner
    doc.text(`Email: ${systemEmail}`, 10, 10);
    doc.text(`Phone: ${systemPhone}`, 10, 15);

    doc.text('Product Admin Report', 10, 30); // Adjusted vertical position after contact info

    // Calculations
    const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
    const inventoryValue = products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
    const categories = [...new Set(products.map(product => product.category))];
    const outOfStock = products.filter(product => product.quantity < 1);

    // Adding to PDF
    let y = 50; // Initial vertical position after logo
    doc.text(`Total Quantity: ${totalQuantity}`, 10, y);
    y += 10;
    doc.text(`Inventory Value: $${inventoryValue.toFixed(2)}`, 10, y);
    y += 10;
    doc.text(`Total Categories: ${categories.length}`, 10, y);
    y += 10;

    // Out of Stock Products
    doc.text('Out of Stock Products:', 10, y);
    outOfStock.forEach(product => {
      y += 10;
      doc.text(`- ${product.name}`, 15, y);
    });

    doc.save('ProductAdminReport.pdf');
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={downloadPdf}>Download PDF</button>
          {/* Display products or other content here */}
        </>
      )}
    </div>
  );
};

export default ProductAdminReport;
