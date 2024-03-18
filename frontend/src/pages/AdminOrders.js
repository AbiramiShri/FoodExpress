import React, {useState, useEffect} from 'react';
import authApi from '../api/authApi';
// import SideBar from '../components/SideBar';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const {data} = await authApi.get('/api/orders/admin-orders');
    //  console.log(data)
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Container>
      <div className="mainarea admin ">
        <div className="all-orders-area">
          <h2>All Orders</h2>
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
                            <h4>
                              {item?.qty} x {item?.name}
                            </h4>
                            {/* <p>Quantity:{item?.qty}</p> */}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="status">
                      <p>Placed on {order?.createdAt} </p>
                      <span>Your item has been placed.</span>
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

export default AdminOrders;
