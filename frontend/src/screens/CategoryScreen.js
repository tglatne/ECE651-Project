import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import CategoryService from '../api/category/CategoryService';
import Product from '../components/Product';

function CategoryScreen() {
    const { category } = useParams();
    
    const [products, setProducts] = useState([]);
    useEffect(() => {
        CategoryService.getCategory(category).then((response) =>
        setProducts(response.data)
        );
    }, [category]);

    return (
        <div className='mt-4'>
        <Row>
            {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
        </Row>
        </div>
    );
    }

export default CategoryScreen;
