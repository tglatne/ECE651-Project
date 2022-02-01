import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Category({ category }) {
  return (
    <Card style={{ height: '92%' }} className='my-3 p-3 rounded text-center'>
      <Link to={`/products/categories/${category}`}>
        {/* <Card.Img
              variant='top'
              src={product.image}
              style={{ height: '320px' }}
            /> */}
      </Link>

      <Card.Body>
        <Link
          to={`/products/categories/${category}`}
          style={{ textDecoration: 'none' }}
        >
          <Card.Title as='div' className='my-3'>
            <h4>
              <strong>{category}</strong>
            </h4>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Category;
