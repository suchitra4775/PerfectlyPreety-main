import React, { useRef, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Post } from "../utilities/HttpService (3)";

const Contact = () => {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = fullnameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const subject = subjectRef.current.value.trim();
    const message = messageRef.current.value.trim();

    const newErrors = {};

    if (!fullname) {
     newErrors.fullname = "Full name is required";
    } else if (fullname.length < 3) {
      newErrors.fullname = "Name should not be less than 2 characters";
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (phone && !phone.match(phoneRegex)) {
      newErrors.phone = "*Invalid phone number";
    }

    // Subject validation
  if (!subject) {
    newErrors.subject = "Subject is required";
  } else if (subject.length <= 5) {
    newErrors.subject = "Subject should be more than 5 characters";
  }

    // Message validation
    if (!message) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = { fullname, email, phone, subject, message };

    try {
      await Post("http://localhost:8888/contactdata", formData);
      alert("Message submitted successfully!");

      fullnameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      subjectRef.current.value = "";
      messageRef.current.value = "";

      setErrors({});
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
                <form onSubmit={handleSubmit} noValidate>
          <div className="row gy-4">
            
            <div className="col-12">
              <label htmlFor="fullname" className="form-label fw-semibold">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                id="fullname"
                name="fullname"
                ref={fullnameRef}
                placeholder="Enter your full name"
              />
              {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label htmlFor="email" className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                ref={emailRef}
                placeholder="you@example.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label fw-semibold">
                Phone
              </label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                id="phone"
                name="phone"
                ref={phoneRef}
                placeholder="10-digit number"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            {/* Subject */}
            <div className="col-12">
              <label htmlFor="subject" className="form-label fw-semibold">
                Subject <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                id="subject"
                name="subject"
                ref={subjectRef}
                placeholder="Write a short subject"
              />
              {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
            </div>

            {/* Message */}
            <div className="col-12">
              <label htmlFor="message" className="form-label fw-semibold">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                id="message"
                name="message"
                rows="4"
                ref={messageRef}
                placeholder="Write your message here..."
              ></textarea>
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            {/* Submit Button */}
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
