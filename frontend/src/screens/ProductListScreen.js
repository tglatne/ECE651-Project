import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Table, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  listProducts,
} from '../actionCreators/productActionCreators';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import {
  PRODUCT_ADD_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productAdd = useSelector((state) => state.productAdd);
  const { success } = productAdd;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: deletSuccess } = productDelete;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [searchParams] = useSearchParams();
  let keyword = '';
  if (searchParams) {
    keyword = searchParams.get('keyword');
  } else {
    keyword = '';
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdminn) {
      navigate('/login');
    }
    if (success) {
      dispatch({ type: PRODUCT_ADD_RESET });
    }
    if (deletSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts(keyword));
  }, [dispatch, keyword, navigate, deletSuccess, success, userInfo]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const addProductHandler = () => {
    navigate('/admin/product/add/');
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentproducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const productIndex = (currentPage - 1) * productsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        <div>
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
              {currentproducts.map((product, index) => (
                <tr key={index}>
                  <td>{productIndex + index + 1}</td>
                  <td>
                    <Image
                      src={product.image}
                      alt={product.product_name}
                      fluid
                    />
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
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            isList={true}
          />
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
