import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

function ProductAddScreen() {
  const [formData, setFormData] = useState({
    product_name: '',
    category: '',
    price_walmart: 0,
    price_sobeys: 0,
    price_zehrs: 0,
    walmart_url: '',
    sobeys_url: '',
    zehrs_url: '',
    description: '',
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>

        <Form>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Product Name'
              name='product_name'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Category'
              name='category'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter Image' />
            <Form.Control type='file' label='Choose File' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='price'>
            <Form.Label>Price(Walmart)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Price(Walmart)'
              name='price_walmart'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='price'>
            <Form.Label>Price(Sobeys)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Price(Sobeys)'
              name='price_sobeys'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='price'>
            <Form.Label>Price(Zehrs)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Price(Zehrs)'
              name='price_zehrs'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='url'>
            <Form.Label>URL(Walmart)</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter URL(Walmart)'
              name='walmart_url'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='url'>
            <Form.Label>URL(Sobeys)</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter URL(Sobeys)'
              name='sobeys_url'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='url'>
            <Form.Label>URL(Zehrs)</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter URL(Zehrs)'
              name='zehrs_url'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              as='textarea'
              rows={5}
              placeholder='Enter Description'
              name='description'
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Group>
          <Row>
            <Col style={{ textAlign: 'right' }}>
              <Button variant='primary' type='submit'>
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProductAddScreen;
