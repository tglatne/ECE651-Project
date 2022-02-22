import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actionCreators/userActionCreators';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const user = {
    name: name,
    email: email,
    password: password,
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setInfo('Passwords do not match!');
    } else {
      dispatch(register(user));
      navigate('/');
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Register</h1>
        {info && <Message variant='danger'>{info}</Message>}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={registerHandler}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter Email Address'
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
          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account? <Link to={'/login'}>Sign In</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
