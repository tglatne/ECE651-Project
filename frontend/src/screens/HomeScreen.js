<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import ProductService from '../api/product/ProductService';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ProductService.getAllProducts().then((response) =>
      setProducts(response.data)
    );
  });

  return (
    <div className='mt-4'>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actionCreators/productActionCreators";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="mt-4">
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
    </div>
  );
}

export default HomeScreen;
