import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actionCreators/orderActionCreators";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <Row>
      <Col md={9}>
        <h2>My Shopping Lists</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Total_Walmart</th>
                <th>Total_Sobeys</th>
                <th>Total_Zehrs</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>${order.total_price_walmart}</td>
                  <td>${order.total_price_sobeys}</td>
                  <td>${order.total_price_zehrs}</td>
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
