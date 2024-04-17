import React from 'react';
import {useSelector} from 'react-redux';
// import '../styles/cart.css'
// import SideBar from '../components/SideBar'
import emtycart from '../assets/images/emtycart.gif';
import CartItemCard from '../components/CartItemCard';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Container} from 'react-bootstrap';
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartPrice = cartItems.reduce(
    (total, itm) => total + itm?.price * itm?.qty,
    0
  );
  const deliveryPrice = cartPrice > 500 || cartPrice === 0 ? 0 : 5;
  const discount = 0;
  const totalPrice = cartPrice + deliveryPrice - discount;
  const auth = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const checkoutHandler = () => {
    if (auth) {
      navigate(`/shipping`);
    } else {
      navigate('/signin?redirect=shipping');
    }
  };
  return (
    <Container>
      {/* <SideBar/> */}
      <div className="cart-screen">
        <h2>MY CART</h2>
        {cartItems?.length > 0 ? (
          <div className="cart-area">
            <div className="all-items">
              {cartItems.map((item) => (
                <CartItemCard key={item.product} item={item} />
              ))}
            </div>
            <div className="checkout-area mb-5 mb-sm-0">
              <div className="billing">
                <h6>PRICE DETAILS</h6>
                <div className="details">
                  <div className="item">
                    <p>Price</p>
                    <p>
                      <span>${cartPrice}</span>
                    </p>
                  </div>

                  <div className="item">
                    <p>Delivery Charges</p>
                    <p>
                      {deliveryPrice === 0 ? (
                        <span className="free">Free</span>
                      ) : (
                        <span>${deliveryPrice}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="total">
                  <h6>Total</h6>
                  <h6>${totalPrice}</h6>
                </div>
              </div>
              <button
                onClick={checkoutHandler}
                disabled={totalPrice === 0 ? true : false}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <>
            <img src={emtycart} alt="" />
            <h2>Hey, it feels so light!</h2>
            <p>There is nothing in your bag. Let's add some items.</p>
            <Link to="/Menu">
              <button>Go Back</button>
            </Link>
          </>
        )}
      </div>
    </Container>
  );
};

export default Cart;
