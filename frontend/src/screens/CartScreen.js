import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { addToCart } from "../actionCreators/cartActionCreators";
import Message from "../components/Message";

function CartScreen() {
  const {id} = useParams();


  const [searchParams] = useSearchParams();
  let qty = 0;
  if (searchParams) {
    qty = searchParams.get("qty");
  } else {
    qty = 1;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);

  return <div>{qty}</div>;
}

export default CartScreen;
