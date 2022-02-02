<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { Row, Col } from 'react-bootstrap';
import Category from '../components/Category';
import CategoryService from '../api/category/CategoryService';

function DepartmentScreen() {
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        CategoryService.getAllCategories().then((response) =>
        setCategories(response.data)
        );
    }, []);

    return (
        <div className='mt-4'>
        <Row>
            {categories.map((category) => (
            <Col key={uuid()} sm={12} md={6} lg={4} xl={3}>
                <Category category={category} />
            </Col>
            ))}
        </Row>
        </div>
    );
=======
import React, { useEffect } from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Category from "../components/Category";
import { listCategories } from "../actionCreators/categoryActionCreators";

function DepartmentScreen() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div className="mt-4">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {categories.map((category) => (
            <Col key={uuid()} sm={12} md={6} lg={4} xl={3}>
              <Category category={category} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
}

export default DepartmentScreen;
