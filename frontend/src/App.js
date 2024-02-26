import React, {Fragment} from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import Contact from './pages/Contact';

const App = () => {
  return (
    // Set up BrowserRouter as Router for routing
    <Router>
      <Fragment>
        {/* Main container for the application */}
        <main>
          {/* Define routes for different pages */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/signin" element={<Signin />} /> {/* Signin page */}
            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
            <Route path="/profile" element={<Profile />} /> {/* Profile page */}
            <Route path="/menu" element={<Menu />} /> {/* Menu page */}
            <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          </Routes>
        </main>
      </Fragment>
    </Router>
  );
};

export default App;
