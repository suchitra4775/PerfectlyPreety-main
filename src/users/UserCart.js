import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link, } from "react-router-dom";
import { Delete, Get } from "../utilities/HttpService (3)";

const UserCart = () => {
  const [userCart, setUserCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
  console.log("Username:", username);
  Get(`http://localhost:8888/userdashboard/?name:${username}`)
    .then((res) => {
      console.log("Fetched cart data:", res); 
      const cartWithQty = res.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setUserCart(cartWithQty);
      calculateTotal(cartWithQty);
    })
    .catch((err) => {
      console.error("Error fetching cart:", err);
      alert("Error loading cart.");
    });
}, [username]);


  useEffect(() => {
  console.log("Cart updated:", userCart);
}, [userCart]);


  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * parseFloat(item.price),
      0
    );
    setTotalPrice(total);
  };

 const updateQuantity = (id, image, delta) => {
  const itemToUpdate = userCart.find((item) => item.id === id && item.image === image);
  if (!itemToUpdate) return;

  const newQty = Math.max(1, itemToUpdate.quantity + delta);

  axios
    .put(`http://localhost:8888/userdashboard/${itemToUpdate.id}`, {
      ...itemToUpdate,
      quantity: newQty,
    })
    .then(() => {
      const updatedCart = userCart.map((item) =>
        item.id === id && item.image === image
          ? { ...item, quantity: newQty }
          : item
      );
      setUserCart(updatedCart);
      calculateTotal(updatedCart);
    })
    .catch((err) => {
      console.error("Quantity update failed:", err);
      alert("Failed to update quantity.");
    });
};


  const removeFromCart = (id, image) => {
    const target = userCart.find(
      (item) => item.id === id && item.image === image
    );
    if (!target) return;

    Delete(`http://localhost:8888/userdashboard/${target.id}`)
      .then(() => {
        const update = window.confirm("Are you sure you want to remove?");
        if (update) {
          const updatedCart = userCart.filter(
            (item) => !(item.id === id && item.image === image)
          );
          setUserCart(updatedCart);
          calculateTotal(updatedCart);
        }
      })
      .catch((err) => {
        console.error("Remove failed:", err);
        alert("Failed to remove item.");
      });
  };

  return (
    <div style={{ background: "#fffafc", minHeight: "100vh" }}>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: "#d63384", fontFamily: "Poppins, sans-serif" }}>
          Your Shopping Cart
        </h2>

        {userCart.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <p className="text-muted">Cart is empty. Add something you love 💖</p>
            <Link
              to="/blush"
              style={{
                backgroundColor: "#dd6da5ff",
                padding: "7px 9px",
                borderRadius: "25px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Buy products
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table align-middle table-borderless shadow-sm"
              style={{ background: "#ffffff", borderRadius: "12px" }}
            >
              <thead style={{ background: "#fce4ec", color: "#6d2177" }}>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price (₹)</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {userCart.map((item, index) => (
                  <tr key={`${item.id}_${item.image}_${index}`}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.description}
                        width="80"
                        style={{ borderRadius: "10px", objectFit: "contain" }}
                      />
                    </td>
                    <td className="fw-semibold">{item.description}</td>
                    <td className="text-danger fw-bold">₹{item.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.image, -1)}
                        >
                          −
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.image, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill"
                        onClick={() => removeFromCart(item.id, item.image)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end mt-4">
              <h4 style={{ color: "#333" }}>
                Total: <span className="text-success">₹{totalPrice.toFixed(2)}</span>
              </h4>
              <Link
                to="/checkout"
                className="btn btn-dark rounded-pill mt-2 px-4"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserCart;
