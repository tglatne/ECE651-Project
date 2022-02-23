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
  const [product_name, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price_walmart, setPriceWalmart] = useState(0);
  const [price_sobeys, setPriceSobeys] = useState(0);
  const [price_zehrs, setPriceZehrs] = useState(0);
  const [walmart_url, setUrlWalmart] = useState('');
  const [sobeys_url, setUrlSobeys] = useState('');
  const [zehrs_url, setUrlZehrs] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product.id === undefined || product.id !== Number(id)) {
      dispatch(listProductDetails(id));
    } else {
      setProductName(product_name);
      setCategory(category);
      setPriceWalmart(price_walmart);
      setPriceSobeys(price_sobeys);
      setPriceZehrs(price_zehrs);
      setUrlWalmart(walmart_url);
      setUrlSobeys(sobeys_url);
      setUrlZehrs(zehrs_url);
      setDescription(description);
    }
  }, [dispatch, id, product]);

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
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={price_walmart}
                onChange={(e) => setPriceWalmart(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price(Sobeys)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price(Sobeys)'
                value={price_sobeys}
                onChange={(e) => setPriceSobeys(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price(Zehrs)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price(Zehrs)'
                value={price_zehrs}
                onChange={(e) => setPriceZehrs(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Walmart)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Walmart)'
                value={walmart_url}
                onChange={(e) => setUrlWalmart(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Sobeys)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Sobeys)'
                value={sobeys_url}
                onChange={(e) => setUrlSobeys(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Zehrs)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Zehrs)'
                value={zehrs_url}
                onChange={(e) => setUrlZehrs(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                rows={5}
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
