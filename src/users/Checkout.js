import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Delete, Get } from '../utilities/HttpService (3)';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('');
  const [address, setAddress] = useState('');
  const [useremail, setuseremail] = useState('');
  const [modeError, setModeError] = useState('');
  const [addressError, setAddressError] = useState('');
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    Get(`http://localhost:8888/loginuser?name=${username}`)
      .then((res) => {
        setuseremail(res[0].email)
      })
      .catch((err) => {
        console.log("Email fetch error:", err);
      });
  }, []);

  useEffect(() => {
    Get(`http://localhost:8888/userdashboard?name=${username}`)
      .then((res) => setCartItems(res))
      .catch((err) => console.error(err));
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleModeChange = (e) => {
    setDeliveryMode(e.target.value);
    setModeError('');
  };

  const handlePlaceOrder = async () => {
    let isValid = true;

    if (!deliveryMode) {
      setModeError("Please select a delivery mode.");
      isValid = false;
    }

    if (deliveryMode === 'Home Delivery' && !address.trim()) {
      setAddressError("Please enter your delivery address.");
      isValid = false;
    } else {
      setAddressError('');
    }

    if (!isValid) return;

    const deliveryDateTime = new Date().toLocaleString('en-IN',{
      dateStyle:"medium",
      timeStyle:"short"
    });

    try {
      const orders = cartItems.map((item) =>
        axios.post('http://localhost:8888/orderItems', {
          name: username,
          email: useremail,
          product: item.description,
          image: item.image,
          quantity: item.quantity,
          price: item.price * item.quantity,
          mode: deliveryMode,
          deliveryDate:deliveryDateTime,
          address: deliveryMode === 'Home Delivery' ? address : 'N/A'
        })
      );

      await Promise.all(orders);

      const deletions = cartItems.map((item) =>
        Delete(`http://localhost:8888/userdashboard/${item.id}`)
      );

      await Promise.all(deletions);

      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Something went wrong while placing the order.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h3>🧾 Checkout Summary</h3>

        {cartItems.length === 0 ? (
          <div className="text-center mt-5">
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

            <div className="mt-4">
              <label className="form-label fw-bold">Mode of Delivery:</label>
              <select
                className={`form-select ${modeError ? 'is-invalid' : ''}`}
                value={deliveryMode}
                onChange={handleModeChange}
              >
                <option value="">Select Mode</option>
                <option value="Home Delivery">Home Delivery</option>
                <option value="Self Pickup">Self Pickup</option>
                <option value="Online">Online</option>
              </select>
              {modeError && <div className="invalid-feedback">{modeError}</div>}
            </div>

            {deliveryMode === 'Home Delivery' && (
              <div className="mt-3">
                <label className="form-label fw-bold">Address:</label>
                <textarea
                  className={`form-control ${addressError ? 'is-invalid' : ''}`}
                  rows="3"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {addressError && <div className="invalid-feedback">{addressError}</div>}
              </div>
            )}

            <div className="text-center mt-5">
              {deliveryMode === 'Online' && (
                <>
                  <h5>Scan & Pay using UPI</h5>
                  <img
                    src="/assests/images/Logo/qrimage.jpg"
                    alt="QR Code"
                    style={{ width: "400px", margin: "20px auto", display: "block" }}
                  />
                </>
              )}
              {deliveryMode === 'Self Pickup' && (
                <div style={{ textAlign: "start", marginTop: "-20px" }}>
                  <p style={{ color: "crimson", fontWeight: 700, fontSize: "20px" }}>Perfectly Preety Shop Address:-</p>
                  <p style={{ wordSpacing: "2px", fontSize: "18px", color: "#4a4749ff" }}>
                    Sai crystal society, B-wing,<br />Wagholi, Pune-412207<br /><b>Contact: </b>+91 8788994706
                  </p>
                </div>
              )}
              <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
                ✅ Place Order
              </button>
              <br /><br />
              <Link to="/"><button className="btn btn-outline-secondary">
                Back to Home 🏠
              </button></Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
