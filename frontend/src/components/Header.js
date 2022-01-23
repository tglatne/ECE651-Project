import React, { useState, useEffect} from 'react';
import uuid from 'react-uuid';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CategoryService from '../api/category/CategoryService';


function Header() {

  const [categories, setCategories] = useState([])
  useEffect(() => {
      CategoryService.getAllCategories()
      .then(
          response => setCategories(response.data)
      )
  });

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>

              <LinkContainer to="/">
                <Navbar.Brand>SmartWalletSaver</Navbar.Brand>
              </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                  <LinkContainer to="/cart">
                    <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer>
                    
                  <LinkContainer to="/products"> 
                    <Nav.Link>Products</Nav.Link>
                  </LinkContainer>

                        <NavDropdown title="Categories" id="basic-nav-dropdown">

                        {
                            categories.map (
                                category => (
                                  <LinkContainer key={uuid()} to={`/products/catergories/${category}`}>
                                    <NavDropdown.Item>{category}</NavDropdown.Item>
                                  </LinkContainer>                      
                                )
                            )
                        }
                        <NavDropdown.Divider />
                        <LinkContainer to="/products/catergories"> 
                          <NavDropdown.Item href="">All Catergories</NavDropdown.Item>
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
