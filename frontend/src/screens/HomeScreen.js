import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actionCreators/productActionCreators';
import Pagination from '../components/Pagination';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [searchParams] = useSearchParams();
  let keyword = '';
  if (searchParams) {
    keyword = searchParams.get('keyword');
  } else {
    keyword = '';
  }

  // let search = `?keyword=${keyword}`
  // console.log(search)

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentproducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='mt-4'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {currentproducts.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
          />
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
