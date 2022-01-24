import React, { useState, useEffect } from 'react';
import ProductService from '../api/product/ProductService';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ProductService.getAllProducts().then((response) =>
      setProducts(response.data)
    );
  });

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

export default HomeScreen;
