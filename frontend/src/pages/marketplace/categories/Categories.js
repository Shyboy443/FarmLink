import { useEffect, useRef, useState } from 'react';
import { useCategory } from '../../../customHook/CategoryProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoriesNav from '../../../components/Categories/CategoriesNav';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import productService from "../../../redux/features/product/ProductService";
import Search from '../../../components/search/Search';
import './Categories.css';
import Footer from '../../../components/footer/Footer';

function Categories() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useCategory();
    const searchRef = useRef(null);

    useEffect(() => {
        
        if (searchRef.current && searchRef.current.querySelector) {
            const input = searchRef.current.querySelector('input');
            if (input) {
                input.style.borderRadius = '25px'; 
            }
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let res;
                if (category === 'all') {
                    res = await productService.getAllProducts();
                } else {
                    res = await productService.getProdcutsByCategory(category);
                }
                setProducts(res);
                setFilteredProducts(res);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
    fetchProducts();
    }, [category]);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, search]);

    return (
        <>
            <CategoriesNav />
            <Row className="justify-content-center mb-4">
                    <Col xs={4} md={8} lg={4}>
                        
                    <div ref={searchRef}>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    </Col>
                </Row>
            <Container style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
             
                {!loading ? (
                    <InfiniteScroll
                        dataLength={filteredProducts.length}
                        next={() => {}}
                        loader={<Spinner animation="border" />}
                        hasMore={false}
                    >
                        <Container fluid>
                            <Row>
                                {filteredProducts.map((product) => (
                                    <Col xs={12} md={6} lg={3} key={product._id.toString()}>
                                        <ProductCard product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </InfiniteScroll>
                ) : (
                    <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                )}
               
            </Container>
            <div className='Footer'> <Footer /></div>
           
        </>
    );
}


export default Categories;
