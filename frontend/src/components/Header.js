import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


function Header() {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">SmartWalletSaver</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                    <Nav.Link href="#link"><i className='fas fa-user'></i>Login</Nav.Link>
                    <Nav.Link href="#products">Products</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/catergories/bakery">Bakery</NavDropdown.Item>
                        <NavDropdown.Item href="/catergories/fruits">Fruits</NavDropdown.Item>
                        <NavDropdown.Item href="/catergories/meats">Meats</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/catergories">All Catergories</NavDropdown.Item>
                        </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  );
      

}

export default Header;
