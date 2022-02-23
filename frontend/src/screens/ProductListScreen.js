import React, { useEffect } from 'react';
import { Row, Col, Button, Table, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actionCreators/productActionCreators';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log('Deleted!');
  };

  const addProductHandler = () => {
    navigate('/admin/product/add/');
  };

  return (
    <div className='align-items-center'>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button style={{ marginTop: '2.5rem' }} onClick={addProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped responsive bordered hover className='table-sm'>
          <thead
            style={{
              textAlign: 'center',
            }}
          >
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price(Walmart)</th>
              <th>Price(Sobeys)</th>
              <th>Price(Zehrs)</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image src={product.image} alt={product.product_name} fluid />
                </td>
                <td>{product.product_name}</td>
                <td>{product.price_walmart}</td>
                <td>{product.price_sobeys}</td>
                <td>{product.price_zehrs}</td>
                <td>{product.description}</td>
                <td>
                  <LinkContainer to={`/admin/product/edit/${product.id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product.id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ProductListScreen;
