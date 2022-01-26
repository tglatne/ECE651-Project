import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { listProductDetails } from "../actionCreators/productActionCreators";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
  const { id } = useParams();

  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

  const handleIncrement = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const handleDecrement = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 0));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="mt-5">
          <Col md={6}>
            <Image
              style={{ height: "41rem", width: "32rem" }}
              src={product.image}
              alt={product.title}
              fluid
            />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item as="div">
                <h3>{product.title}</h3>
              </ListGroup.Item>

              <ListGroup.Item className="mt-2">
                Price_Walmart: ${product.price}
              </ListGroup.Item>

              <ListGroup.Item className="mt-2">
                Price_Sobeys: ${product.price}
              </ListGroup.Item>

              <ListGroup.Item className="mt-2">
                Price_Zehrs: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item className="mt-2">
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item className="mt-3">
                  <Row>
                    <Col>Price_Walmart:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="mt-3">
                  <Row>
                    <Col>Price_Sobeys:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="mt-3">
                  <Row>
                    <Col>Price_Zehrs:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="mt-3">
                  <Row lg={5}>
                    <Col className="my-2">Qty:</Col>
                    <Col><Button variant="primary" size="sm" onClick={handleDecrement}>-</Button></Col>
                    <Col><h5>{qty}</h5></Col>
                    <Col><Button variant="primary" size="sm" onClick={handleIncrement}>+</Button></Col>
                    <Col><Button variant="primary" size="sm" onClick={() => setQty(0)}>Reset</Button></Col>
                   
                    {/* <Col className="my-2">{qty}</Col>
                    <Col><Button variant="primary" size="sm" onClick={handleIncrement}>+</Button></Col>
                    <Col><Button variant="primary" size="sm" onClick={() => setQty(0)}>Reset</Button></Col> */}
                    {/* <button onClick={() => setCount(0)}>Reset</button> */}
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="my-3 d-grid">
                  <Button className="btn-block" type="button">
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
