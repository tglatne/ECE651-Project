import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import { listCategoryDetails } from "../actionCreators/categoryActionCreators";
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

export default CategoryScreen;
