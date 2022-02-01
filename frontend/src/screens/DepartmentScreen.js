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
}

export default DepartmentScreen;
