import React from 'react';
import { Button } from 'react-bootstrap';
import './Categories.css';
import { FaCarrot, FaAppleAlt, FaBorderAll } from "react-icons/fa";
import { useCategory } from '../../customHook/CategoryProvider';


function CategoriesNav() {
    const { setCategory } = useCategory(); 
    return (
        <div className="container" id="categories">
            <h1>Categories</h1>
            <div className="divider">
                <Button variant="dark" id='all' onClick={() => setCategory('all')}><FaBorderAll />All</Button>{' '}
                <Button variant="dark" id='fruits' onClick={() => setCategory('Fruit')}><FaAppleAlt />Fruits</Button>{' '}
                <Button variant="dark" id='vegetables' onClick={() => setCategory('Vegetable')}><FaCarrot />Vegetables</Button>{' '}
            </div>
        </div>
    );
}

export default CategoriesNav;
