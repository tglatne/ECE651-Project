import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { login } from '../actionCreators/userActionCreators';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const user = {
    username: email,
    password: password,
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
