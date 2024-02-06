import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './assets/css/style.css';


const App = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;