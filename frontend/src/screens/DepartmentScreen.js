import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { Row, Col } from 'react-bootstrap';
import Category from '../components/Category';
import CategoryService from '../api/category/CategoryService';

function DepartmentScreen() {
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        CategoryService.getAllCategories().then((response) =>
        setCategories(response.data)
        );
    }, []);

    return (
        <div className='mt-4'>
        <Row>
            {categories.map((category) => (
            <Col key={uuid()} sm={12} md={6} lg={4} xl={3}>
                <Category category={category} />
            </Col>
            ))}
        </Row>
        </div>
    );
}

export default DepartmentScreen;
