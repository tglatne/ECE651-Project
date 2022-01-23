import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card style={{ height: '37rem' }} className='my-3 p-3 rounded'>
      <a href={`/products/${product.id}`}>
        <Card.Img
          variant='top'
          style={{ height: '320px' }}
          src={product.image}
        />
      </a>

      <Card.Body>
        <a href={`/products/${product._id}`}>
          <Card.Title
            as='div'
            style={{ marginTop: '25px', marginBottom: '15px' }}
          >
            <strong>{product.title}</strong>
          </Card.Title>
        </a>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
