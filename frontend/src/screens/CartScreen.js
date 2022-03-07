import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import {
  addToCart,
  removeFromCart,
} from "../actionCreators/cartActionCreators";
import { createOrder } from "../actionCreators/orderActionCreators";
import Message from "../components/Message";
import { ORDER_ADD_RESET } from "../constants/orderConstants";

function CartScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderAdd = useSelector((state) => state.orderAdd);
  const { order, error, success } = orderAdd;

  const [searchParams] = useSearchParams();
  let qty = 0;
  if (searchParams) {
    qty = searchParams.get("qty");
  } else {
    qty = 1;
  }

  cart.totalPrice_walmart = cart.cartItems
    .reduce((acc, item) => acc + item.price_walmart * item.qty, 0)
    .toFixed(2);
  cart.totalPrice_sobeys = cart.cartItems
    .reduce((acc, item) => acc + item.price_sobeys * item.qty, 0)
    .toFixed(2);
  cart.totalPrice_zehrs = cart.cartItems
    .reduce((acc, item) => acc + item.price_zehrs * item.qty, 0)
    .toFixed(2);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.id}`);
      dispatch({ type: ORDER_ADD_RESET });
    }
  }, [success, navigate]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const saveOrder = () => {
    dispatch(
      createOrder({
        cartItems: cart.cartItems,
        totalPrice_walmart: cart.totalPrice_walmart,
        totalPrice_sobeys: cart.totalPrice_sobeys,
        totalPrice_zehrs: cart.totalPrice_zehrs,
      })
    );
    // if (success) {
    //   dispatch({ type: ORDER_CREATE_RESET });
    //   navigate(`/order/${order.id}`);
    // }
  };


  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product_id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                  </Col>
                  {/* <Col md={2}>${item.price_walmart}</Col> */}
                  <Col md={3}>
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="mt-3">
                          <Row>
                            <Col>Price_Walmart:</Col>
                            <Col>
                              <strong>${item.price_walmart}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className="mt-3">
                          <Row>
                            <Col>Price_Sobeys:</Col>
                            <Col>
                              <strong>${item.price_sobeys}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className="mt-3">
                          <Row>
                            <Col>Price_Zehrs:</Col>
                            <Col>
                              <strong>${item.price_zehrs}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                  <Col className="mt-1">
                    <Button
                      bsPrefix="adjust-btn"
                      type="button"
                      size="sm"
                      onClick={() => {
                        Number(item.qty) > 1
                          ? dispatch(
                              addToCart(item.product_id, Number(item.qty) - 1)
                            )
                          : removeFromCartHandler(item.product_id);
                      }}
                    >
                      <i className="fa fa-minus"></i>
                    </Button>
                  </Col>
                  <Col className="mt-1">
                    <Form.Label>{item.qty}</Form.Label>
                  </Col>
                  <Col className="mt-1">
                    <Button
                      bsPrefix="adjust-btn"
                      type="button"
                      size="sm"
                      onClick={() => {
                        dispatch(
                          addToCart(item.product_id, Number(item.qty) + 1)
                        );
                      }}
                    >
                      <i className="fa fa-plus"></i>
                    </Button>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product_id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h2>
              <ListGroup.Item>
                Total_Price_Walmart: $
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.qty) * item.price_walmart,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                Total_Price_Sobeys: $
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.qty) * item.price_sobeys,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                Total_Price_Zehrs: $
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.qty) * item.price_zehrs,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems === 0}
                onClick={saveOrder}
              >
                Save Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
