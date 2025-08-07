import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Get, Post , Delete} from '../utilities/HttpService (3)'

const Checkout = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryMode, setDeliveryMode] = useState("Home Delivery");

  useEffect(() => {
    if (!username) {
      alert("Please login to proceed.");
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await Get(`http://localhost:8888/userdashboard?name=${username}`);
        setCartItems(res.data);

        const calculatedTotal = res.data.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
        setTotal(calculatedTotal);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCartItems();
  }, [username, navigate]);

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      username,
      deliveryMode,
      orderDate: new Date().toISOString(),
      items: cartItems,
      total,
    };

    try {
      await Post("http://localhost:8888/orderItems", orderData);
      await Delete(`http://localhost:8888/userdashboard?name=${username}`);
      alert("✅ Your order has been placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h3>🧾 Checkout Summary</h3>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p>No items in cart.</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Go to Home
            </button>
          </div>
        ) : (
          <>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i}>
                    <td><img src={item.image} alt="img" width="60" /></td>
                    <td>{item.description}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-end fw-bold">Total</td>
                  <td className="fw-bold">₹{total}</td>
                </tr>
              </tbody>
            </table>

            {/* Delivery Mode Selection */}
            <div className="mt-4">
              <label className="form-label fw-bold">Mode of Delivery:</label>
              <select
                className="form-select"
                value={deliveryMode}
                onChange={(e) => setDeliveryMode(e.target.value)}
              >
                <option>Home Delivery</option>
                <option>Self Pickup</option>
              </select>
            </div>

            {/* QR and Place Order */}
            <div className="text-center mt-5">
              <h5>Scan & Pay using UPI</h5>
              <img
                src="/assests/images/Logo/qrimage.jpg"
                alt="QR Code"
                style={{ width: "400px", margin: "20px auto", display: "block" }}
              />
              <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
                ✅ Place Order
              </button>
              <br /><br />
              <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
                Back to Home 🏠
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
