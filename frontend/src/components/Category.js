import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Category({ category }) {
  return (
    <Card style={{ height: '92%' }} className='my-3 p-3 rounded text-center'>
      <Link to={`/products/categories/${category.id}`}></Link>

      <Card.Body>
        <Link
          to={`/products/categories/${category.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Card.Title as='div' className='my-3'>
            <h4>
              <strong>{category.category_name}</strong>
            </h4>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Category;
