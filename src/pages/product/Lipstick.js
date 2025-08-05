import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { Get, Post } from "../../utilities/HttpService (3)";

const Lipstick = () => {
  const [lipstickData, setLipstickData] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    Get("http://localhost:8888/products").then((res) => {
      const lipstick = res.filter((item)=>item.category === "lipstick")
      setLipstickData(lipstick);
    }).catch((err)=>{
        console.log("Lipstick err=",err)
      });
  }, []);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      Get(`http://localhost:8888/userdashboard?name=${username}`)
        .then((res) => {
          const cartMap = {};
          res.forEach((item) => {
            const key = `${item.id}_${item.image}`;
            cartMap[key] = true;
          });
          setAddedToCart(cartMap);
        });
    }
  }, []);

  const handleAddToCart = (product) => {
  const islogin = sessionStorage.getItem("islogin");
  const username = sessionStorage.getItem("username");

  if (!islogin || !username) {
    const confirmLogin = window.confirm("Login to continue shopping.");
    if (confirmLogin) {
      sessionStorage.setItem("pendingProduct", JSON.stringify(product));
      sessionStorage.setItem("returnPath", window.location.pathname);
      navigate("/login");
    }
    return;
  }

  const key = `${product.id}_${product.image}`;
  const productWithUser = { ...product, name: username, quantity: 1 };

  // Check if this exact product is already in the cart for this user
  Get(`http://localhost:8888/userdashboard?name=${username}`)
    .then((res) => {
      const alreadyInCart = res.some(
        (item) => item.id === product.id && item.image === product.image
      );

      if (alreadyInCart) {
        alert("This product is already in your cart.");
        return;
      }

      // Add to cart
      Post("http://localhost:8888/userdashboard", productWithUser)
        .then(() => {
          setAddedToCart((prev) => ({ ...prev, [key]: true }));
          window.dispatchEvent(new CustomEvent("cartUpdate"));
          alert("Product added to cart successfully!");
        })
        .catch((err) => {
          console.error("Add to Cart Error:", err);
          alert("Failed to add product.");
        });
    })
    .catch((err) => {
      console.error("Error checking cart:", err);
    });
};


  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "rgb(255 24 24 / 32%)" }}>
        <img
          src="/assests/images/lipstick/lipstickbg.avif"
          className="w-100"
          alt="Lipstick Banner"
        />
        <div className="container mt-5">
          <h3
            className="text-center mb-4 display-6"
            style={{
              color: "#7b1fa2",
              textShadow: "1px 2px 3px rgba(64, 59, 59, 0.64)",
            }}
          >
            All Lipstick Products
          </h3>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {lipstickData.map((item) => {
              const key = `${item.id}_${item.image}`;
              return (
                <div className="col" key={key}>
                  <div className="card h-100">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.description}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <p
                        className="text-center flex-grow-1"
                        style={{ fontSize: "15px", fontWeight: 300 }}
                      >
                        {item.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>₹{item.price}/-</h5>
                        <p className="text-muted text-decoration-line-through mb-0">
                          ₹{item.originalPrice}
                        </p>
                        <span className="text-success">{item.discount}% off</span>
                      </div>
                      <button
                        className={
                          "btn mt-3 " +
                          (addedToCart[key] ? "btn-outline-danger" : "btn-danger")
                        }
                        onClick={() =>
                          addedToCart[key]
                            ? navigate("/usercart")
                            : handleAddToCart(item)
                        }
                      >
                        {addedToCart[key] ? "Go to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Lipstick;
