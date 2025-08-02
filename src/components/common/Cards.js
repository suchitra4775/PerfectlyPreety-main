import React, { useEffect, useState } from "react";
import { Get } from "../../utilities/HttpService (3)";
import "./Cards.css";

const Cards = () => {
  const [cardsimg, setcardsimg] = useState([]);

  useEffect(() => {
    Get("http://localhost:8888/card")
      .then((res) => setcardsimg(res))
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ letterSpacing: "6px", fontWeight: "500" }}>
        SALE IS LIVE
      </h2>
      <div className="row g-4">
        {cardsimg.map((item, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm rounded-4">
              <img
                src={item.image}
                className="card-img-top rounded-top-4"
                alt={`product${index}`}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <p className="card-text mb-2" style={{ minHeight: "60px" }}>
                  {item.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <h5 className="text-danger mb-0">₹{item.price}</h5>
                  <small className="text-muted text-decoration-line-through">
                    ₹{item.originalPrice}
                  </small>
                  <span className="text-success fw-bold">{item.discount}% off</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
