import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Get } from "../utilities/HttpService (3)";

const About = () => {
  const [aboutdata, setaboutdata] = useState();

  useEffect(() => {
    Get("http://localhost:8888/about").then((res) => {
        console.log("About = ",res)
        setaboutdata(res);
      })
      .catch((err) => {
        console.log("Error detected", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* Stylish About Section */}
      <section className="py-5" style={{ backgroundColor: "#afcfd1" }}>
        <div className="container text-center">
          <h3
            className="text-uppercase text-muted mb-2"
            style={{
              letterSpacing: "2px",
              fontWeight: "700",
              fontSize: "55px",
            }}
          >
            About Us
          </h3>
          <h2 className="display-4 fw-bold mb-4" style={{ color: "#b03060" }}>
            Beauty begins the moment you decide to be yourself.
          </h2>
          {aboutdata?.map((val,index) => (
            <p key={`info-${index}`} className="lead text-dark mb-3">{val.info}</p>
          ))}
          <Link to="/lipstick">
            <button className="btn btn-lg btn-outline-dark rounded-pill px-5 py-2">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg h-100">
                <div className="row g-0 align-items-center">
                  <div className="col-md-5">
                    <img
                      src={"/assests/images/about/about2.avif"}
                      className="img-fluid rounded-start"
                      alt="Natural Skincare"
                    />
                  </div>
                  <div className="col-md-7 p-4">
                    <h5 className="card-title fw-bold mb-3">
                      Naturally Beautiful
                    </h5>
                    <p className="card-text text-muted">
                      Our products are infused with plant-based ingredients and
                      backed by science to ensure your skin stays radiant and
                      healthy — naturally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg h-100">
                <div className="row g-0 align-items-center">
                  <div className="col-md-5">
                    <img
                      src={"/assests/images/about/about1.avif"}
                      className="img-fluid rounded-start"
                      alt="Expert Team"
                    />
                  </div>
                  <div className="col-md-7 p-4">
                    <h5 className="card-title fw-bold mb-3">
                      Our Beauty Experts
                    </h5>
                    <p className="card-text text-muted">
                      A passionate team of dermatologists, chemists, and makeup
                      artists collaborating to create products that enhance your
                      natural glow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-5 text-center"
        style={{ backgroundColor: "#afcfd1" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Feel Good. Look Stunning.</h2>
          <p className="lead text-muted mb-4">
            Join thousands who trust GlowMuse for clean, high-quality skincare &
            makeup.
          </p>
          {aboutdata?.map((val,index) => (
            <p key={`info2-${index}`} className="lead text-dark mb-3">{val.info2}</p>
          ))}
          <b style={{fontSize:"20px"}}>So, go ahead and pick your faves. It's time to Rule the world, one look at a time!</b><br/><br/>
          <Link to="/lipstick">
            <button className="btn btn-dark btn-lg rounded-pill px-5 py-2">
              Discover More
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
