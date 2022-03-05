import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProduct,
  listProductDetails,
} from '../actionCreators/productActionCreators';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_EDIT_RESET } from '../constants/productConstants';

function ProductEditScreen() {
  const [formData, setFormData] = useState({
    product_name: '',
    category: 0,
    price_walmart: 0,
    price_sobeys: 0,
    price_zehrs: 0,
    walmart_url: '',
    sobeys_url: '',
    zehrs_url: '',
    description: '',
  });

  const {
    product_name,
    category,
    price_walmart,
    price_sobeys,
    price_zehrs,
    walmart_url,
    sobeys_url,
    zehrs_url,
    description,
  } = formData;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productEdit = useSelector((state) => state.productEdit);
  const { success } = productEdit;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editProduct(formData, id));
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdminn) {
      navigate('/login');
    }
    if (success) {
      dispatch(listProductDetails(id));
      dispatch({ type: PRODUCT_EDIT_RESET });
      navigate('/admin/productlist');
    }
    if (!product || (product && product.id !== Number(id))) {
      dispatch(listProductDetails(id));
    } else {
      setFormData({
        product_name: product && product.product_name,
        category: product && product.category,
        price_walmart: product && product.price_walmart,
        price_sobeys: product && product.price_sobeys,
        price_zehrs: product && product.price_zehrs,
        walmart_url: product && product.walmart_url,
        sobeys_url: product && product.sobeys_url,
        zehrs_url: product && product.zehrs_url,
        description: product && product.description,
      });
    }
  }, [dispatch, id, success, navigate, product]);

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
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Product Name'
                value={product_name}
                name='product_name'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                onChange={(e) => onChangeHandler(e)}
                name='category'
                value={category}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Control>
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
                value={price_sobeys}
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
                value={price_zehrs}
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
                value={walmart_url}
                name='walmart_url'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Sobeys)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Sobeys)'
                value={sobeys_url}
                name='sobeys_url'
                onChange={(e) => onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>URL(Zehrs)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter URL(Zehrs)'
                value={zehrs_url}
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
                value={description}
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
