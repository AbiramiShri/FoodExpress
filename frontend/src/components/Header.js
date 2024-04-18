import React, {useState} from 'react';
import {Navbar, Nav, Container, Dropdown} from 'react-bootstrap';
import Logo from '../assets/images/logo.jpeg';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/auth';

// Header component
const Header = ({show}) => {
  // Retrieve user data from Redux store
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user && user.user && user.isAdmin);
  // Function to get initials from user name
  const getInitials = (name) => {
    return name
      .toUpperCase()
      .split(' ')
      .map((word) => word.charAt(0))
      .join('');
  };

  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    dispatch(logout());
    window.location.href = `/`;
  };

  return (
    <header>
      {/* Bootstrap Navbar */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className="col-3 col-md-6">
            {/* Logo */}
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid col-12 col-md-4 col-lg-2"
            />
          </Navbar.Brand>
          {/* Navbar toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Navbar collapse content */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav className="mr-auto">
              {/* Menu link */}
              {user && user.user && user.user.isAdmin ? (
                <>
                  <Nav.Link
                    href="/products-list"
                    className="me-3 text-end  text-uppercase text-lg-center">
                    Products List
                  </Nav.Link>
                  <Nav.Link
                    href="/add-product"
                    className="me-3 text-end  text-uppercase text-lg-center">
                    Add Product
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    href="/Menu"
                    className="me-3 text-end  text-uppercase text-lg-center">
                    Menu
                  </Nav.Link>
                  <Nav.Link
                    href="/aboutUs"
                    className="me-3  text-uppercase text-end text-lg-center">
                    About Us
                  </Nav.Link>
                </>
              )}

              <div>
                {/* If user is not logged in, show login link */}
                {!user?.user && (
                  <Nav.Link
                    className="me-3  text-uppercase text-end text-lg-center"
                    href="/signin">
                    Login
                  </Nav.Link>
                )}
                {/* Dropdown menu */}
                <Dropdown className="text-center">
                  {/* If user is logged in, show user initials */}
                  {user?.user && (
                    <Dropdown.Toggle className="btn" id="dropdown-basic">
                      {getInitials(user.user.name)}
                    </Dropdown.Toggle>
                  )}
                  {/* Dropdown items */}
                  {user?.user && (
                    <Dropdown.Menu>
                      <Dropdown.Item className="text-center" href="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item className="text-center" href="/orders">
                        Order History
                      </Dropdown.Item>
                      <Dropdown.Item className="text-center" href="/wishlist">
                        Wishlist
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-center"
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
