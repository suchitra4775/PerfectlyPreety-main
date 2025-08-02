import React from "react";

const Carousel = () => {
  return (
    <div className="container-fluid px-0">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/assests/images/carousel/courosel1.webp"
              className="d-block w-100 img-fluid"
              alt="img1"
              style={{ height: "auto", maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5
                style={{
                  textShadow: "1px 1px 3px white",
                  color: "#3E1C2C",
                  fontWeight: "bold",
                }}
              >
                Beauty Blossom Lipsticks
              </h5>
              <h2
                style={{
                  color: "#222222",
                  textShadow: "1px 1px 4px rgba(255,255,255,0.5)",
                }}
              >
                Monsoon sale!!! 50% off on lipstick and tints
              </h2>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/assests/images/carousel/courosel2.webp"
              className="d-block w-100 img-fluid"
              alt="img2"
              style={{ height: "auto", maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5
                style={{
                  textShadow: "1px 1px 3px white",
                  color: "#D72638",
                  fontWeight: "bold",
                }}
              >
                Buy any Product
              </h5>
              <h2 style={{ color: "#1B1F3B", textShadow: "1px 1px 4px white" }}>
                Starts from just 399/-
              </h2>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/assests/images/carousel/courosel3.webp"
              className="d-block w-100 img-fluid"
              alt="img3"
              style={{ height: "auto", maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5
                style={{
                  color: "#2C2C2C",
                  fontWeight: "600",
                  fontSize: "22px",
                  textShadow: "1px 1px 2px rgba(255, 255, 255, 0.4)",
                }}
              >
                Beauty Blossom Special Offer!!!
              </h5>
              <h2
                style={{
                  color: "#1E1E1E",
                  textShadow: "1px 1px 3px rgba(255,255,255,0.6)",
                }}
              >
                Buy 1 get 1 Sunscreen free!!
              </h2>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
