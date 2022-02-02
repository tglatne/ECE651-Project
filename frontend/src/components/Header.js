<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CategoryService from '../api/category/CategoryService';

function Header() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    CategoryService.getAllCategories().then((response) =>
      setCategories(response.data)
    );
  }, []);
=======
import React, { useEffect } from 'react';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listCategories } from '../actionCreators/categoryActionCreators';

function Header() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>SmartWalletSaver</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i>Login
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/products'>
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>

<<<<<<< HEAD
              <NavDropdown title='Categories' id='basic-nav-dropdown'>
=======
              <NavDropdown
                title='Categories'
                id='basic-nav-dropdown'
                menuVariant='dark'
              >
>>>>>>> b5961c8eeb1c87863a98cbc7c9a0cfcd44eb4d22
                {categories.map((category) => (
                  <LinkContainer
                    key={uuid()}
                    to={`/products/categories/${category}`}
                  >
                    <NavDropdown.Item>{category}</NavDropdown.Item>
                  </LinkContainer>
                ))}
                <NavDropdown.Divider />
                <LinkContainer to='/products/catergories'>
                  <NavDropdown.Item href=''>All Catergories</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
