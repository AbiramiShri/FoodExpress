import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Logo from '../assets/images/logo.jpeg'


const Header = () => {
  return (
    <header>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="col-3 col-md-6">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid col-12 col-md-4 col-lg-2"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link
                href="/"
                className="me-3 text-end text-uppercase text-lg-center">
                Home
              </Nav.Link>
              <Nav.Link
                href="Menu"
                className="me-3 text-end  text-uppercase text-lg-center">
                Menu
              </Nav.Link>
              <Nav.Link
                href="Account"
                className="me-3  text-uppercase text-end text-lg-center">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
