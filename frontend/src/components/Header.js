import React, { useEffect } from 'react';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listCategories } from '../actionCreators/categoryActionCreators';
import { logout } from '../actionCreators/userActionCreators';
import SearchBox from '../components/SearchBox';

function Header() {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

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

              {userInfo ? (
                <NavDropdown
                  title={userInfo.namee}
                  id='basic-nav-dropdown'
                  menuVariant='dark'
                >
                  <LinkContainer to='/profile/'>
                    <NavDropdown.Item>My Shopping Lists</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item className='logout' onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to='/products'>
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>

              <NavDropdown
                title='Categories'
                id='basic-nav-dropdown'
                menuVariant='dark'
              >
                {categories.map((category) => (
                  <LinkContainer
                    key={uuid()}
                    to={`/products/categories/${category.id}`}
                  >
                    <NavDropdown.Item>
                      {category.category_name}
                    </NavDropdown.Item>
                  </LinkContainer>
                ))}
                <NavDropdown.Divider />
                <LinkContainer to='/products/catergories'>
                  <NavDropdown.Item href=''>All Catergories</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {userInfo && userInfo.isAdminn && (
                <NavDropdown
                  title='Admin'
                  id='basic-nav-dropdown'
                  menuVariant='dark'
                >
                  <LinkContainer to='/admin/productlist/'>
                    <Nav.Link>ProductList</Nav.Link>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
