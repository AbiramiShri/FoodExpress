import React, {Fragment} from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import OrderSummry from './pages/OrderSummry';
import OrderDetails from './pages/OrderDetails';
import AllOrders from './pages/AllOrders';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import CustomPizza from './pages/CustomPizza';
import Address from './pages/Address';
import Admin from './pages/Admin';
import AdminOrders from './pages/AdminOrders';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductsList from './pages/ProductList';

const App = () => {
  return (
    // Set up BrowserRouter as Router for routing
    <Router>
      <Fragment>
        {/* Main container for the application */}
        <main className="mb-3">
          {/* Define routes for different pages */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/signin" element={<Signin />} /> {/* Signin page */}
            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
            <Route path="/profile" element={<Profile />} /> {/* Profile page */}
            <Route path="/menu" element={<Menu />} /> {/* Menu page */}
            <Route path="/aboutUs" element={<AboutUs />} /> {/* AboutUs page */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<OrderSummry />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/orders" element={<AllOrders />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/custom-pizza" element={<CustomPizza />} />
            <Route path="/your-address" element={<Address />} />
            <Route path="/admin-side" element={<Admin />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/products-list" element={<ProductsList />} />
          </Routes>
        </main>
      </Fragment>
    </Router>
  );
};

export default App;
