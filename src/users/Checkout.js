import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const name = sessionStorage.getItem('username');
  const email = sessionStorage.getItem('useremail');

  useEffect(() => {
    axios.get(`http://localhost:8888/userdashboard?username=${name}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error(err));
  }, [name]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setDeliveryMode(mode);
  };

  const handlePlaceOrder = async () => {
    const deliveryDate = new Date().toISOString().split('T')[0]; // today's date

    try {
      const orders = cartItems.map((item) =>
        axios.post('http://localhost:8888/orderItems', {
          name,
          email,
          product: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity,
          mode: deliveryMode,
          deliveryDate,
          address: deliveryMode === 'Home Delivery' ? address : 'N/A'
        })
      );

      await Promise.all(orders);

      const deletions = cartItems.map((item) =>
        axios.delete(`http://localhost:8888/userdashboard/${item.id}`)
      );

      await Promise.all(deletions);

      alert('Order placed successfully!');
      navigate('/userdashboard');
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

            {/* Delivery Mode Selection */}
            <div className="mt-4">
              <label className="form-label fw-bold">Mode of Delivery:</label>
              <select
                className="form-select"
                value={deliveryMode}
                onChange={handleModeChange}
              >
                <option value="">Select Mode</option>
                <option value="Home Delivery">Home Delivery</option>
                <option value="Self Pickup">Self Pickup</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* Address box if Home Delivery */}
            {deliveryMode === 'Home Delivery' && (
              <div className="mt-3">
                <label className="form-label fw-bold">Address:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}

            {/* QR and Place Order */}
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
                <div style={{textAlign:"start", marginTop:"-20px"}}>
                <p style={{color:"crimson",fontWeight:700,fontSize:"20px"}}>Perfectly Preety Shop Address:-</p>
                <p style={{wordSpacing:"2px", fontSize:"18px", color:"#4a4749ff" }}>Sai crystal society, B-wing,<br/>Wagholi, Pune-412207<br/><b>Contact: </b>+91 8788994706</p>
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
