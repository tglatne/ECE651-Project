<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import CategoryService from '../api/category/CategoryService';
import Product from '../components/Product';

function CategoryScreen() {
    const { category } = useParams();
    
    const [products, setProducts] = useState([]);
    useEffect(() => {
        CategoryService.getCategory(category).then((response) =>
        setProducts(response.data)
        );
    }, [category]);

    return (
        <div className='mt-4'>
        <Row>
            {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
        </Row>
        </div>
    );
    }
=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listCategoryDetails } from "../actionCreators/categoryActionCreators";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

function CategoryScreen() {
  const { category } = useParams();

  const dispatch = useDispatch();
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { products, loading, error } = categoryDetails;

  useEffect(() => {
    dispatch(listCategoryDetails(category));
  }, [category]);

  return (
    <div className="mt-4">
      <Link to="/products/catergories" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22

export default CategoryScreen;
