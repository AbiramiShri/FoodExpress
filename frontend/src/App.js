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
    <Router>
      <Fragment>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Fragment>
    </Router>
  );
};

export default App;
