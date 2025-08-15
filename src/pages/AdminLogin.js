import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Get } from '../utilities/HttpService (3)';

const AdminLogin = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Get('http://localhost:8888/loginadmin')
      .then((res) => setAdmin(res))
      .catch((err) => {
        console.log("Admin data fetch error:", err);
        alert("Failed to load admin data.");
      });
  }, []);

  const validate = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!email || !password) {
      alert("Please fill all fields.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    if (!passRegex.test(password)) {
      alert("Password must have at least 6 characters with letters and numbers.");
      return false;
    }

    return true;
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passRef.current.value.trim();

    if (!validate(email, password)) return;

    const adminFound = admin.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );

    if (adminFound) {
      sessionStorage.setItem("Adminlogin", "true");
      alert("Admin login successful!");
      navigate("/admindashboard");
    } else {
      alert("Invalid email or password.");
    }
  };
  

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "#fce4ec" }}>
      <form
        onSubmit={handleAdmin}
        className="w-100"
        style={{
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 0px 10px #e91e63"
        }}
      >
        <h2 className="text-center text-danger mb-4">Admin Login</h2>

        <div className="mb-3">
          <input
            ref={emailRef}
            type="text"
            placeholder="Admin Email"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            ref={passRef}
            type="password"
            placeholder="Admin Password"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-danger w-100 fw-semibold">
          Login
        </button>

        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none small">
            Not an admin?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
