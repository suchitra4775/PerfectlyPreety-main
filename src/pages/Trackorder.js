import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './Trackorder.css'; 
import { Get } from '../utilities/HttpService (3)';

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

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">🧾 My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center text-muted">
            <p>No orders yet. Go grab something pretty 💄</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>Mode</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.mode}</td>
                    <td>{new Date(item.order_date).toLocaleDateString()}</td>
                    <td>
                      <span className="badge bg-success">{item.status || "Placed"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Trackorder;
