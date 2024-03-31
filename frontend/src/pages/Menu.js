import React, {useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import Product from '../components/products/Product';
import pizzaSlice from '../assets/images/pizza.jpeg';
import Burger from '../assets/images/Big_Mac.jpeg';
import juice from '../assets/images/Coca-Cola.jpeg';

import popcorn from '../assets/images/Mini_Fry.jpeg';
import sandwich from '../assets/images/Caesar_Wrap.jpeg';
import smoothie from '../assets/images/Hot_Fudge_Sundae.jpeg';
import Cart from '../components/Cart';

const Menu = () => {
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState('pizza');
  return (
    <section id="takeaway_list" className="menu-category mt-3">
      <Container>
        <Row>
          <Col xs={12} md={12} lg={2} className="mb-4">
            <div id="cuisines-items" className="box-shadow">
              <h5 className="text-center text-uppercase">Items</h5>
              <div className="category px-3 d-flex flex-row flex-wrap flex-lg-column gap-2 justify-content-center align-items-center">
                <div
                  className={`cat-icon box-shadow mb-3 p-1 text-center ${
                    category === 'pizza' && 'active'
                  } `}
                  onClick={() => setCategory('pizza')}>
                  <div className="cuisine-box">
                    <img className="img-fluid" src={pizzaSlice} alt="pizza" />
                  </div>
                  <div className="cuisine-title">Pizzas</div>
                </div>
                <div
                  className={`cat-icon box-shadow mb-3 p-1 text-center  ${
                    category === 'Burger' && 'active'
                  } `}
                  onClick={() => setCategory('Burger')}>
                  <div className="cuisine-box">
                    <img className="img-fluid" src={Burger} alt="Burgers" />
                  </div>
                  <div className="cuisine-title">Burgers</div>
                </div>
                <div
                  className={`cat-icon box-shadow mb-3 p-1 text-center  ${
                    category === 'Sandwich' && 'active'
                  } `}
                  onClick={() => setCategory('Sandwich')}>
                  <div className="cuisine-box">
                    <img className="img-fluid" src={sandwich} alt="pizza" />
                  </div>
                  <div className="cuisine-title">Sandwich</div>
                </div>
                <div
                  className={`cat-icon box-shadow mb-3 p-1 text-center  ${
                    category === 'Smoothy' && 'active'
                  } `}
                  onClick={() => setCategory('Smoothy')}>
                  <div className="cuisine-box">
                    <img className="img-fluid" src={smoothie} alt="pizza" />
                  </div>
                  <div className="cuisine-title">Smoothies</div>
                </div>
                <div
                  className={`cat-icon box-shadow mb-3 p-1 text-center  ${
                    category === 'Snak' && 'active'
                  } `}
                  onClick={() => setCategory('Snak')}>
                  <div className="cuisine-box">
                    <img className="img-fluid" src={popcorn} alt="Snacks" />
                  </div>
                  <div className="cuisine-title">Sides</div>
                </div>
                <div
                  className={`cat-icon box-shadow mb-3 p-1 text-center  ${
                    category === 'Drink' && 'active'
                  } `}
                  onClick={() => setCategory('Drink')}>
                  <div className="cuisine-box">
                    <img className="img-fluid" src={juice} alt="pizza" />
                  </div>
                  <div className="cuisine-title">Drinks</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={6} className="box-shadow">
            <Product category={category} />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Cart />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Menu;
