import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getOrderDetails} from '../actions/orders';
import OrderDetail from '../skeleton/OrderDetail';
import Message from '../components/Message';

const OrderDetails = () => {
  const params = useParams();
  const {id} = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  const {order = {}, loading} = useSelector((state) => state.orderDetails);
  const {sucess} = useSelector((state) => state.order);

  const {
    shippingAddress,
    orderItems,
    totalprice,
    shippingPrice,
    itemsPrice,
    _id,
    paymentMethod,
  } = order;
  const [show, setShow] = useState(sucess);
  return (
    <>
      <div className="shipping">
        {!loading ? (
          <div className="shipping-details mt-5">
            <div className="shippingshippingAddress">
              <h4>ORDER DETAILS</h4>
              <div className="add-sec-area">
                {shippingAddress && (
                  <div className={`og-add`}>
                    <h6>Items</h6>
                    {orderItems?.map((item) => (
                      <div className="des">
                        <p>
                          {item.qty} x {item.name} = ${item.price}
                        </p>
                      </div>
                    ))}
                    <h6 class="text-start mt-4">Shipping</h6>

                    <p className="fw-bold">Order ID: {_id}</p>

                    <p className="fw-bold">{shippingAddress.name}</p>
                    <span>
                      {shippingAddress.address},{shippingAddress.town}
                    </span>
                    <span>
                      {shippingAddress.city},{shippingAddress.state} -
                      {shippingAddress.pinCode}{' '}
                    </span>
                    <span>
                      <span>Mobile No:</span>
                      {shippingAddress.mobNo}
                    </span>
                    <h6 class="text-start mt-4">Payment Method</h6>

                    <div className="select-opt w-100">
                      <label htmlFor="cod">
                        {paymentMethod?.toUpperCase()}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="checkout-area">
              <div className="billing">
                <h6>PRICE DETAILS</h6>
                <div className="details">
                  <div className="item">
                    <p>Price</p>
                    <p>
                      <span>$</span>
                      {itemsPrice}
                    </p>
                  </div>

                  <div className="item">
                    <p>Delivery Charges</p>
                    <p>
                      {shippingPrice === 0 ? (
                        <span className="free">Free</span>
                      ) : (
                        <span>${shippingPrice}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="total">
                  <h6>Total</h6>
                  <h6>${totalprice?.toFixed(2)}</h6>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <OrderDetail />
        )}
      </div>
      <Message
        showModal={show}
        msg={'Order Placed Successfuly'}
        img={
          'https://cdn.dribbble.com/users/335541/screenshots/7102045/media/5b7237fe7bbfa31531d6e765576f1bc4.jpg?compress=1&resize=400x300'
        }
        type="error"
        closeModal={setShow}
      />
    </>
  );
};
export default OrderDetails;
