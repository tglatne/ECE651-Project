import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actionCreators/orderActionCreators";
import Message from "../components/Message";
import Loader from "../components/Loader";

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, error, loading } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.totalPrice_walmart = order.cartItems
      .reduce((acc, item) => acc + item.price_walmart * item.quantity, 0)
      .toFixed(2);
    order.totalPrice_sobeys = order.cartItems
      .reduce((acc, item) => acc + item.price_sobeys * item.quantity, 0)
      .toFixed(2);
    order.totalPrice_zehrs = order.cartItems
      .reduce((acc, item) => acc + item.price_zehrs * item.quantity, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Shopping List: {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Name: </strong> {order.user.namee}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.cartItems.length === 0 ? (
                <Message variant="info">Shopping List is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.img} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          <Row>
                            <strong>price_walmart</strong>
                            {item.quantity} X ${item.price_walmart} = $
                            {(item.quantity * item.price_walmart).toFixed(2)}
                          </Row>
                          <Row>
                            <strong>price_sobeys</strong>
                            {item.quantity} X ${item.price_sobeys} = $
                            {(item.quantity * item.price_sobeys).toFixed(2)}
                          </Row>
                          <Row>
                          <strong>price_zehrs</strong>
                          {item.quantity} X ${item.price_zehrs} = $
                          {(item.quantity * item.price_zehrs).toFixed(2)}
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Walmart:</Col>
                  <Col>${order.totalPrice_walmart}</Col>
                </Row>
                <Row>
                  <Col>Sobeys:</Col>
                  <Col>${order.totalPrice_sobeys}</Col>
                </Row>
                <Row>
                  <Col>Zehrs:</Col>
                  <Col>${order.totalPrice_zehrs}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
