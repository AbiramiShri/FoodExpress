import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.jpeg';
import banner3 from '../assets/images/banner3.jpeg';
import pizzaboy from '../assets/images/pizzaboy.png';
import pizzaSlice from '../assets/images/pizzaSlice.png';
import Burger from '../assets/images/burger.png';
import juice from '../assets/images/juice.png';

import popcorn from '../assets/images/popcorn.png';
import sandwich from '../assets/images/sandwich.png';
import smoothie from '../assets/images/smoothie.png';

// Main Component

const Main = () => {
  return (
    <>
      <Carousel showThumbs={false} showStatus={false}>
        <div>
          <img src={banner1} alt="banner1" />
          <div className="legend">
            <h3 className="mb-3 text-uppercase">
              A big delight in every bite.
            </h3>
            <p>
              <a href="/Menu">Order Online</a>
            </p>
          </div>
        </div>
        <div>
          <img src={banner2} alt="banner1" />
          <div className="legend">
            <h3 className="mb-3 text-uppercase"> Order online quickly</h3>
            <p>
              <a href="/Menu">Order Online</a>
            </p>
          </div>
        </div>
        <div>
          <img src={banner3} alt="banner1" />
          <div className="legend">
            <h3 className="mb-3 text-uppercase">Enjoy the food</h3>
            <p>
              <a href="/Menu">Order Online</a>
            </p>
          </div>
        </div>
      </Carousel>

      <main>
        <div class="banner">
          <div class="img">
            <img src={pizzaboy} alt="Pizza Boy" />
          </div>
          <div class="text">
            <h2 className="text-uppercase">OFFER OFFER OFFER!!!!</h2>
            <p className="mb-4">
              Get Free delivery on <span>$50</span> and above
            </p>
            <p>
              <a href="/Menu">Order Online</a>
            </p>
          </div>
        </div>

        <section className="info p-5">
          <Container>
            <Row>
              <Col xs={12} md={4} className="info-odd-bg">
                {/* Content for the first column */}
                <div>
                  <h4 className="text-center text-uppercase">Our Food</h4>
                  <p>
                    As a food chain, we are proud to say we have made some
                    changes for you, our customers. Without you, there would be
                    no us. So, we are making it our mission to be the food
                    sector you want. One that is dedicated to improving the way
                    we prepare food and the ingredients that go into it.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4} className="info-even-bg">
                {/* Content for the second column */}
                <div>
                  <h4 className="text-center text-uppercase">Our Service</h4>
                  <p>
                    We create magic for all ages with our mouth smacking foods
                    and swiftest restaurant takeaway service. We assure you to
                    get the best possible service from each of our staff
                    members. It’s our service that will keep us in your memories
                    and our food will definitely bring you back again.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4} className="info-odd-bg">
                <div>
                  <h4 className="text-center text-uppercase">Our Menu</h4>
                  <p>
                    Here you have a wide range of menu to choose from. We love
                    to see you taste our new add-ons and welcome you to give a
                    feedback. We can promise you every dish will have its own
                    unique flavour and its own charm to enhance your experience
                    of takeaway food. Let’s taste the world in a different way.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4} className="info-even-bg">
                <div>
                  <h4 className="text-center text-uppercase">Our Hygiene</h4>
                  <p>
                    We take strong step towards providing hygienic food to all
                    our beloved consumers. From raw materials, ingredients to
                    cooking and then packaging we take care of the hygiene level
                    properly so that we can provide you with the tastiest yet
                    most hygienic food.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4} className="info-odd-bg">
                <div>
                  <h4 className="text-center text-uppercase">Our Value</h4>
                  <p>
                    Is our restaurant on your way to work or perhaps just down
                    the street? Feel like having a walk? You can place an order
                    online and pick it up from our restaurant at ease. We will
                    neither keep you waiting nor rip you off, we value your time
                    and money. So, you can grab your favourite meal at a go.
                  </p>
                </div>
              </Col>
              <Col xs={12} md={4} className="info-even-bg">
                <div>
                  <h4 className="text-center text-uppercase">Our Price</h4>
                  <p>
                    Today as you can see everything is priced sky high. Look
                    around and you will find most of the food sector overpriced
                    and over rated. We assure you our food will fill your
                    appetite, will treat your taste buds and will enhance your
                    metabolism but will not cost you a fortune. It’s cheap &
                    great!!
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          <section className="category p-5">
            <div className="category-area">
              <h3 className="text-center text-uppercase">Our Menu</h3>
              <div className="category">
                <div className="cat-icon">
                  <div className="img">
                    <img src={pizzaSlice} alt="pizza" />
                  </div>
                  <div className="text">Pizzas</div>
                </div>
                <div className="cat-icon">
                  <div className="img">
                    <img src={Burger} alt="Burger" />
                  </div>
                  <div className="text">Burgers</div>
                </div>
                <div className="cat-icon">
                  <div className="img">
                    <img src={sandwich} alt="Sandwich" />
                  </div>
                  <div className="text">Sandwich</div>
                </div>
                <div className="cat-icon">
                  <div className="img">
                    <img src={smoothie} alt="smoothie" />
                  </div>
                  <div className="text">smoothies</div>
                </div>
                <div className="cat-icon">
                  <div className="img">
                    <img src={popcorn} alt="popcorn" />
                  </div>
                  <div className="text">Snacks</div>
                </div>
                <div className="cat-icon">
                  <div className="img">
                    <img src={juice} alt="juice" />
                  </div>
                  <div className="text">Juice</div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};

export default Main;
