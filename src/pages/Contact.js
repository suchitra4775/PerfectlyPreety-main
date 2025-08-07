import React, { useRef } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Post } from "../utilities/HttpService (3)";

const Contact = () => {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = fullnameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const subject = subjectRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (!fullname || !email || !subject || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.match(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const formData = { fullname, email, phone, subject, message };

    try {
      await Post("http://localhost:8888/contactdata", formData);
      alert("Message submitted successfully!");

      fullnameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      subjectRef.current.value = "";
      messageRef.current.value = "";
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit message.");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="py-3 py-md-5" style={{ backgroundColor: "rgb(233 185 185)" }}>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 text-center">
              <h3 className="fs-6 text-secondary mb-2 text-uppercase">Get in Touch</h3>
              <h2 className="display-5 mb-4">We're always on the lookout to work with new clients.</h2>
              <hr className="w-50 mx-auto mb-5 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row gy-3 align-items-xl-center">
            <div className="col-12 col-lg-6">
              <img
                className="img-fluid rounded"
                src={"/assests/images/contact/contactbg.webp"}
                alt="Get in Touch"
              />
            </div>

            <div className="col-12 col-lg-6">
              <div className="bg-white border rounded shadow-sm p-4 p-xl-5">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-12">
                      <label htmlFor="fullname" className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        ref={fullnameRef}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        ref={emailRef}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        ref={phoneRef}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        ref={subjectRef}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="3"
                        ref={messageRef}
                      ></textarea>
                    </div>

                    <div className="col-12 d-grid">
                      <button className="btn btn-primary btn-lg" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
