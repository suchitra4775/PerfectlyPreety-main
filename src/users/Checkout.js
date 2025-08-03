import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Delete } from "../utilities/HttpService (3)";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const username = sessionStorage.getItem("username")


  const cartItems = state?.cartItems || [];
  const total = state?.total || 0;

  if (!cartItems.length) {
    return (
      <div>
        <Navbar />
        <div className="container py-5 text-center">
          <h3>No items in cart. Please add products.</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handlepaymentDone=()=>{
    Delete(`http://localhost:8888/userdashboard?name=${username}`).then((res)=>{
      alert("Your order has been placed")
      console.log(res)
      navigate("/")
    }).catch((err)=>{
      console.log(err)

    })
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h3>🧾 Checkout Summary</h3>
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
                <td>
                  <img src={item.image} alt="img" width="60" />
                </td>
                <td>{item.description}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-end fw-bold">
                Total
              </td>
              <td className="fw-bold">₹{total}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-5">
  <h5>Scan & Pay using UPI</h5>
  <img
    src="/assests/images/Logo/qrimage.jpg"
    alt="QR Code"
    style={{ width: "400px", margin: "20px auto", display: "block" }}
  />
  <Link to="/" onClick={handlepaymentDone}>Click once you have done payment</Link><br/><br/>
  <button className="btn btn-success mt-3" onClick={() => navigate("/")}>
    Back to Home 🏠
  </button>
</div>

      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
