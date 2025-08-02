import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Get } from "../utilities/HttpService (3)";

const Loginform = () => {
  const userInputEmail = useRef();
  const userInputPassword = useRef();
  const [userdata, setuserdata] = useState([]);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Get("http://localhost:8888/loginuser")
      .then(res => setuserdata(res))
      .catch(err => console.log("Error fetching users:", err));
  }, []);

  const validate = (email, password) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passRegex.test(password)) {
      newErrors.password = "Minimum 4 characters with letters & numbers.";
    }

    return newErrors;
  };

  const Loginsubmit = (e) => {
    e.preventDefault();

    const email = userInputEmail.current.value.trim();
    const password = userInputPassword.current.value.trim();

    const validationErrors = validate(email, password);
    setErrors(validationErrors);
    setLoginError("");

    if (Object.keys(validationErrors).length === 0) {
      const currentuser = userdata.find(
        (user) => user.email === email && user.password === password
      );

      if (currentuser) {
        sessionStorage.setItem("islogin", true);
        sessionStorage.setItem("username", currentuser.name);
        alert("Login successfull!!✔")

        const pendingProduct = sessionStorage.getItem("pendingProduct");
        const returnPath = sessionStorage.getItem("returnPath");

        sessionStorage.removeItem("pendingProduct");
        sessionStorage.removeItem("returnPath");

        navigate(returnPath || "/");
      } else {
        setLoginError("Incorrect email or password.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: 'url("/assests/images/Card/loginbg.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={Loginsubmit} className="bg-white p-4 p-md-5 rounded-4 shadow" style={{ maxWidth: "420px", width: "100%" }}>
        <h3 className="text-center mb-4" style={{ color: "#e91e63" }}>
          Login to <strong>PrettyCosmetics</strong>
        </h3>

        {loginError && (
          <div className="alert alert-danger py-2 text-center">{loginError}</div>
        )}

        <div className="mb-3">
          <input
            ref={userInputEmail}
            type="email"
            placeholder="Enter your email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <input
            ref={userInputPassword}
            type="password"
            placeholder="Enter your password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-danger w-100 fw-semibold"
          style={{ backgroundColor: "#ff4d6d", border: "none" }}
        >
          Sign In
        </button>

        <div className="d-flex justify-content-between mt-3 small">
          <Link to="/userregister" className="text-decoration-none">Not registered yet?</Link>
          <Link to="/adminlogin" className="text-decoration-none">Login as Admin</Link>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
