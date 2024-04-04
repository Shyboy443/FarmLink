import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useCategory } from '../../customHook/CategoryProvider';

function MarketplaceNavbar({ children, showCategories = true }) {
    const { setCategory } = useCategory();

    const handleCategorySelect = (category) => {
        setCategory(category);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand href="/market">Marketplace</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home" style={{marginLeft: "2rem"}} >Home</Nav.Link>
                            <Nav.Link href="/products" style={{marginLeft: "2rem"}} >Products</Nav.Link>
                            {showCategories && (
                                <NavDropdown title="Categories" id="basic-nav-dropdown" style={{marginLeft: "2rem"}} >
                                    <NavDropdown.Item onClick={() => handleCategorySelect('Vegetable')}>Vegetables</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleCategorySelect('Fruit')}>Fruits</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleCategorySelect('all')}>All Categories</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                        <Nav>
                            <Nav.Link href="#account"style={{marginLeft: "52rem"}}>
                                <FaUserCircle /> Account
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
        </>
    );
}
export default MarketplaceNavbar;
