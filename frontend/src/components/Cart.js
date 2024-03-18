import React, {useState} from 'react';
import {BsCart3, BsFillArrowRightSquareFill} from 'react-icons/bs';
import {IoNotificationsOutline} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import CartItemCard from './CartItemCard';
const Cart = ({data, show}) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const [showNoti, setShow] = useState(false);
  // console.log(cartItems)

  return (
    <div className="leftside box-shadow">
      {show ? null : (
        <div className="side-cart-area">
          <div className="text">
            <h5>Order Menu</h5>
            <Link to="/cart">
              <p>
                VIEW ALL <BsFillArrowRightSquareFill />
              </p>
            </Link>
          </div>
          <div className="cart-area">
            <div className="all-items side-cart">
              {cartItems.slice(0, 3).map((item) => (
                <CartItemCard key={item.product} item={item} />
              ))}
              {cartItems.length > 0 && (
                <Link to="/cart">
                  <button>PROCEED TO CHECKOUT</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
