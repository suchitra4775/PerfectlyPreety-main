import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Get } from '../utilities/HttpService (3)';
import './Trackorder.css';

const Trackorder = () => {
  const [orders, setOrders] = useState([]);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (username) {
      Get(`http://localhost:8888/orderItems?username=${username}`)
        .then((res) => setOrders(res))
        .catch(err => console.error("Error fetching orders", err));
    }
  }, [username]);

  // Group orders by date
  const groupedOrders = orders.reduce((acc, order) => {
    const date = order.deliveryDate || "Unknown Date";
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="container my-5 trackorder-container">
        <h2 className="text-center mb-4 fw-bold">💖 My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center text-muted fs-5">
            No orders yet. Go grab something pretty 💄
          </div>
        ) : (
          Object.keys(groupedOrders).map((date, idx) => (
            <div key={idx} className="mb-5">
              <h5 className="date-heading">{date}</h5>
              <div className="order-list">
                {groupedOrders[date].map((item, i) => (
                  <div className="order-item" key={i}>
                    <div className="order-info">
                      <div className="product-name fw-semibold">{item.product}</div>
                      <div className="product-details">
                        Qty: {item.quantity} | ₹{item.price}
                      </div>
                    </div>
                    <div className="order-status">
                      <span className={`badge ${item.status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                        {item.status || "Placed"}
                      </span>
                      <span className="mode-badge">{item.mode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Trackorder;
