import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card style={{ height: '92%' }} className='my-3 p-3 rounded'>
      <Link to={`/products/${product.id}`}>
        <Card.Img
          variant='top'
          src={product.image}
          style={{ height: '320px' }}
        />
      </Link>

      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title as='div' className='my-3'>
            <strong>{product.product_name}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default Product;
