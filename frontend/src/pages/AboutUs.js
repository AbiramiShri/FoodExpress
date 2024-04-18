import React from 'react';
import {Container} from 'react-bootstrap';
import pizzaSlice from '../assets/images/pizzaSlice.png';
import Burger from '../assets/images/burger.png';
import sandwich from '../assets/images/sandwich.png';
import map from '../assets/images/map.png';

// Contact component
const AboutUs = () => {
  return (
    <Container>
      {/* Placeholder content */}
      <div className="row about">
        <div className="col-md-8 col-12 mt-5">
          <h4 className="text-center mt-3">About Us</h4>
          <p>
            Taste authentic Pizza, Burger, Wraps & sides cuisine at Brantford, a
            vibrant takeaway in Brantford. With a focus on fresh, delicious food
            and quick service, Food Express is the ultimate destination for
            those seeking authentic flavours. Order effortlessly from Food
            Express:
            <ol>
              <li>Explore their menu on Foodhub.</li>
              <li>Add your favourites to the cart.</li>
              <li>Complete your order by choosing a payment method.</li>
            </ol>
            Place your order now for home delivery or collection in Brantford
            and enjoy a memorable experience. We serve mouth-watering dishes
            such as Burgers, Kebab, Peri Peri, Pizza and other dishes.
          </p>
          <table className="table table-light text-center table-responsive table-bordered table-striped">
            <thead>
              <tr>
                <td className="bg-dark text-light">Day</td>
                <td className="bg-dark text-light">Pick up</td>
                <td className="bg-dark text-light">Delivery</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sunday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>11:30AM - 7:30PM</td>
                <td>11:00AM - 8PM</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-4 col-12 my-5 box-shadow">
          <h6 className="mt-3">Cuisines</h6>
          <div className="category-area">
            <div className="category mt-0">
              <a href="/Menu">
                <div className="cat-icon">
                  <div className="img">
                    <img src={pizzaSlice} alt="pizza" />
                  </div>
                  <div className="text">Pizzas</div>
                </div>
              </a>
              <a href="/Menu">
                <div className="cat-icon">
                  <div className="img">
                    <img src={Burger} alt="Burger" />
                  </div>
                  <div className="text">Burgers</div>
                </div>
              </a>
              <a href="/Menu">
                <div className="cat-icon">
                  <div className="img">
                    <img src={sandwich} alt="Sandwich" />
                  </div>
                  <div className="text">Sandwich</div>
                </div>
              </a>
            </div>
            <h6 className="mt-4">Location</h6>
            <p>2232, Dummy Street , Brantford N3S 5K4</p>
            <img src={map} alt="map" className="img-fluid mb-3" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
