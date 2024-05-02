import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import productService from '../../../redux/features/product/ProductService';
import authService from '../../../services/authService';
import './ProductDetails.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import Footer from '../../../components/footer/Footer';




let maxPiecesAvailable = 0;

function ProductDetails() {
    const { productId } = useParams();
    const [otherProducts, setOtherProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [productOwner, setProductOwner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [count, setCount] = useState(1);
    



    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const fetchedProduct = await productService.getProduct(productId);
                setProduct(fetchedProduct);
                 maxPiecesAvailable = fetchedProduct.quantity;

                if (fetchedProduct.user) {
                    const owner = await authService.getUserById(fetchedProduct.user);
                    setProductOwner(owner);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch product');
            } finally {
                setIsLoading(false);
            }
        };
        

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);
 

    useEffect(() => {
        const getProductDataByUser = async () => {
            
        if (productOwner) {
           
          const UserProducts =  await productService.getProductsById(productOwner._id)
                setOtherProducts(UserProducts);
                
                
        }
    }
        getProductDataByUser();
    }, [productOwner]);
    
   
    const incrementCount = () => {
        if (count < maxPiecesAvailable) {
            setCount(count + 1);
        }
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    if (isLoading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <> 
        <Container>
            <Row className="justify-content-center my-3">
                <Col xs={12} md={5}>
                    {/* Display a single static image */}
                    <Card>
                        <Card.Img
                            src={product.image.filePath}
                            alt={product.name}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} md={7}>
                    <Card className="p-3">
                        <Card.Body>
                            <Card.Title as="h3">{product.name}</Card.Title>
                            <h3>{product.price}$</h3>
                            <div className="counter">
                                <button onClick={decrementCount} className="counter-button" disabled={count <= 1}>-</button>
                                <input type="text" value={count} readOnly className="counter-input" />
                                <button onClick={incrementCount} className="counter-button" disabled={count >= maxPiecesAvailable}>+</button>
                                <p className="counter-stock">{maxPiecesAvailable} Pieces available</p>
                            </div>
                            <div className="my-3">
                            {product.quantity <= 0 ? (<Button variant="warning" size="lg" className="w-100 mb-2" disabled>
                                    Out of Stock
                                </Button>) : (
                                <Button variant="warning" size="lg" className="w-100 mb-2">
                                    Buy Now
                                </Button>)}
                                {product.quantity <= 0 ? ( <Button variant="outline-primary" size="lg" className="w-100" disabled>
                                    Add to Cart
                                </Button>):( 
                                <Button variant="outline-primary" size="lg" className="w-100">
                                    Add to Cart
                                </Button>)}
                            </div>
                            {/* Seller contact information */}
                            {productOwner && (
                                <>
                                    <div className="my-3">
                                        <strong>Sold by:</strong> <span style={{ fontSize: '13px' }}>{productOwner.firstName} {productOwner.lastName}</span>
                                    </div>
                                    <div className="my-3">
                                        <strong>Contact:</strong><span style={{ fontSize: '13px' }}> {productOwner.email}</span>
                                    </div>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Product description */}
            <h3>Description</h3>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>

               {/* Additional section for other products by the same owner */}
               <Row className="justify-content-center my-3" >
               <h2 style={{marginTop:'10rem'}}>Other Products by {productOwner?.firstName}</h2>
                  <div className="overflow-scroll">
                
                <Row className="justify-content-start my-3 flex-nowrap">
                    {otherProducts.map((otherProduct) => (
                        <Col xs={12} md={6} lg={3} key={otherProduct._id.toString()}>
                            <ProductCard key={otherProduct._id} product={otherProduct} />
                        </Col>
                    ))}
                </Row>
            </div>
            </Row>
           
        </Container>
        <div className='Footer'>  <Footer/></div>
       
         </>

    );
}

export default ProductDetails;
