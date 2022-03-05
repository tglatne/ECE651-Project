import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actionCreators/productActionCreators';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductEditScreen() {
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

  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Product Name'
                value={product.product_name}
                name='product_name'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={product.category}
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
                value={product.price_walmart}
                name='category'
                step={0.01}
                precision={2}
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price(Sobeys)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price(Sobeys)'
                value={product.price_sobeys}
                name='category'
                step={0.01}
                precision={2}
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price(Zehrs)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price(Zehrs)'
                value={product.price_zehrs}
                name='category'
                step={0.01}
                precision={2}
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Walmart)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Walmart)'
                value={product.walmart_url}
                name='walmart_url'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Sobeys)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Sobeys)'
                value={product.sobeys_url}
                name='sobeys_url'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Zehrs)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Zehrs)'
                value={product.zehrs_url}
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
                value={product.description}
                name='description'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Row>
              <Col style={{ textAlign: 'right' }}>
                <Button variant='primary' type='submit'>
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
