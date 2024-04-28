import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import productService from '../../redux/features/product/ProductService';
import logo from '../../assets/logo.png';
import { Card } from 'react-bootstrap';
import ProductsTable from './ProductTable';

const ProductAdminReport = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [outOfStock, setOutOfStock] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [inventoryValue, setInventoryValue] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getAllProducts();
        const parsedProducts = res.map(product => ({
          ...product,
          quantity: parseInt(product.quantity, 10)
        }));
        setProducts(parsedProducts);
        const outOfStockItems = parsedProducts.filter(product => product.quantity < 1);
        setOutOfStock(outOfStockItems);
        const totalQ = parsedProducts.reduce((acc, product) => acc + product.quantity, 0);
        const invValue = parsedProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);
        setTotalQuantity(totalQ);
        setInventoryValue(invValue);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'JPEG', 160, 10, 30, 30);
    doc.text(`Email: FarmLink.Org@outlook.com`, 10, 10);
    doc.text(`Phone: 0761827545`, 10, 18);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Admin Report', 10, 30);
    doc.setFont('helvetica', 'normal');

    let y = 50;
    doc.text(`Total Quantity: ${totalQuantity}`, 10, y);
    y += 10;
    doc.text(`Inventory Value: $${inventoryValue.toFixed(2)}`, 10, y);
    y += 10;

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
          <Card>
            
            <h2>Product Admin Report</h2>
          <p> Total Quantity : {totalQuantity}</p>
          <p> Inventory Value : ${inventoryValue.toFixed(2)}</p>
          {outOfStock.length > 0 && (
            <div>
              <label htmlFor="outOfStock" style={{fontSize:'1.4rem', color:'#333', marginRight:'2rem'}}> Out of Stock Products :  </label>
              <select id="outOfStock" style={{ width: '300px', height: '35px', fontSize: '16px' }}>
                {outOfStock.map((product, index) => (
                  <option key={index} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button onClick={downloadPdf} style={{  background:'green' , marginTop:'3rem', padding: '.5rem' ,marginLeft:'50rem', marginRight:'50rem'}}>Download PDF</button>
          </Card>
          

          <ProductsTable/>
        </>
      )}
      
      
    </div>
    
  );
};

export default ProductAdminReport;
