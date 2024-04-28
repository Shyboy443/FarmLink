import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsTable.css'; // Make sure the CSS path is correct
import { getAllProducts } from '../../redux/features/product/ProductSlice';

const ProductsTable = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    console.log(products);
    if (loading) return <p>Loading...</p>;

    return (
        <table className="products-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
