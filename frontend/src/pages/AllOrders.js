import React, {useEffect, useState} from 'react';

import Header from '../components/Header';
import authApi from '../api/authApi';
import {Link} from 'react-router-dom';
// import '../styles/allorders.css';
import {useSelector} from 'react-redux';
import {Container} from 'react-bootstrap';
const AllOrders = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const formatDate = (dateString) => {
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-US',
      options
    );
    return formattedDate;
  };

  const getOrders = async () => {
    const {data} = await authApi.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    //  console.log(data)
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <div className="mainarea all-oredrs">
        <div className="all-orders-area">
          <h3 className="text-center w-100">My Orders</h3>
          <div className="display-orders">
            {orders.length > 0 ? (
              orders.map((order) => (
                <Link to={`/order/${order?._id}`}>
                  <div
                    className="order-detail-card box-shadow"
                    key={order?._id}>
                    <div className="order-left-details">
                      {order.orderItems?.map((item) => (
                        <div className="image-card" key={item?._id}>
                          <div className="img">
                            <img src={item?.image} alt="" />
                          </div>
                          <div className="details">
                            <h4>{item?.name}</h4>
                            <p>Quantity:{item?.qty}</p>
                            <p>Place On : {formatDate(order?.createdAt)}</p>
                            <p className="text-success">
                              Your item has been placed.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No Past Orders</h1>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AllOrders;
