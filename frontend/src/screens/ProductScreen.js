import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { listProductDetails } from '../actionCreators/productActionCreators';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const handleIncrement = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const handleDecrement = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 0));
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }


  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='mt-5'>
          <Col md={6}>
            <Image
              style={{ height: '41rem', width: '32rem' }}
              src={product.image}
              alt={product.product_name}
              fluid
            />
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item as='div'>
                <h3>{product.product_name}</h3>
              </ListGroup.Item>

              <ListGroup.Item className='mt-2'>
                Price_Walmart: ${product.price_walmart}
              </ListGroup.Item>

              <ListGroup.Item className='mt-2'>
                Price_Sobeys: ${product.price_sobeys}
              </ListGroup.Item>

              <ListGroup.Item className='mt-2'>
                Price_Zehrs: ${product.price_zehrs}
              </ListGroup.Item>
              <ListGroup.Item className='mt-2'>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col sm={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item className='mt-3'>
                  <Row>
                    <Col>Price_Walmart:</Col>
                    <Col>
                      <strong>${product.price_walmart}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='mt-3'>
                  <Row>
                    <Col>Price_Sobeys:</Col>
                    <Col>
                      <strong>${product.price_sobeys}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='mt-3'>
                  <Row>
                    <Col>Price_Zehrs:</Col>
                    <Col>
                      <strong>${product.price_zehrs}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='mt-3'>
                  <Row lg={4} md={4} sm={1}>
                    <Col className='mt-1'>
                      <label>Qty:</label>
                    </Col>
                    <Col className='mt-1'>
                      <Button
                        bsPrefix='adjust-btn'
                        type='button'
                        size='sm'
                        onClick={handleDecrement}
                      >
                        <i className='fa fa-minus'></i>
                      </Button>
                    </Col>
                    <Col className='mt-1'>
                      <Form.Label>{qty}</Form.Label>
                    </Col>
                    <Col className='mt-1'>
                      <Button
                        bsPrefix='adjust-btn'
                        type='button'
                        size='sm'
                        onClick={handleIncrement}
                      >
                        <i className='fa fa-plus'></i>
                      </Button>
                    </Col>
                  </Row>
                  <Row lg={3}>
                    <Col className='mt-1' md={{ span: 3, offset: 5 }}>
                      <Button
                        type='button'
                        size='sm'
                        onClick={() => {
                          setQty(0);
                          console.log(qty);
                        }}
                        bsPrefix='adjust-btn'
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='my-3 d-grid'>
                  <Button className='btn-block' type='button' onClick={addToCartHandler}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
