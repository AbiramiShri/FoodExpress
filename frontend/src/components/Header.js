import React, {useState} from 'react';
import {Navbar, Nav, Container, Dropdown} from 'react-bootstrap';
import Logo from '../assets/images/logo.jpeg';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/auth';

const Header = ({show}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getInitials = (name) => {
    return name
      .toUpperCase()
      .split(' ')
      .map((word) => word.charAt(0))
      .join('');
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className="col-3 col-md-6">
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
                href="Menu"
                className="me-3 text-end  text-uppercase text-lg-center">
                Menu
              </Nav.Link>
              <Nav.Link
                href="Contact"
                className="me-3  text-uppercase text-end text-lg-center">
                Contact
              </Nav.Link>
              <div>
                {/* If user is logged in, show user initials */}
                {!user?.user && (
                  // If user is not logged in, show login button
                  <Nav.Link
                    className="me-3  text-uppercase text-end text-lg-center"
                    href="signin">
                    Login
                  </Nav.Link>
                )}

                {/* Dropdown menu */}
                <Dropdown className="text-end">
                  {/* If user is logged in, show dropdown menu */}
                  {user?.user && (
                    <Dropdown.Toggle className="btn" id="dropdown-basic">
                      {getInitials(user.user.name)}
                    </Dropdown.Toggle>
                  )}

                  {/* If user is logged in, show dropdown options */}
                  {user?.user && (
                    <Dropdown.Menu>
                      <Dropdown.Item className="text-end" href="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-end"
                        onClick={handleSignOut}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
