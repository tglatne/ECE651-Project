import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Category({ category }) {
<<<<<<< HEAD
    return (
        <Card style={{ height: '92%' }} className='my-3 p-3 rounded'>
          <Link to={`/products/categories/${category}`}>
            {/* <Card.Img
=======
  return (
    <Card style={{ height: '92%' }} className='my-3 p-3 rounded text-center'>
      <Link to={`/products/categories/${category}`}>
        {/* <Card.Img
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
              variant='top'
              src={product.image}
              style={{ height: '320px' }}
            /> */}
<<<<<<< HEAD
          </Link>
    
          <Card.Body>
            <Link to={`/products/categories/${category}`}>
              <Card.Title as='div' className='my-3'>
                <strong>{category}</strong>
              </Card.Title>
            </Link>
          </Card.Body>
        </Card>
      );
=======
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
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
}

export default Category;
