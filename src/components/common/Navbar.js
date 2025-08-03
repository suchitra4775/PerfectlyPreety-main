import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Get } from "../../utilities/HttpService (3)";

const Navbar = () => {
  const [productcount,setproductcount] = useState(0)
  const navigate = useNavigate()
  const [isLogin,setisLogin] = useState(false)
  const [Name,setName] = useState("")

  const handlelogin = ()=>{
      const confirmLogin = sessionStorage.getItem('islogin')
      if(confirmLogin){
        navigate('/usercart')
      }
      else{
        navigate("/login")
      }}

 useEffect(() => {
  const fetchCart = () => {
    const loginstatus = sessionStorage.getItem("islogin");
    const username = sessionStorage.getItem("username");

    if (loginstatus && username) {
      setisLogin(true);
      setName(username);

      Get(`http://localhost:8888/userdashboard?name=${username}`)
        .then((res) => {
          setproductcount(res.length);
        })
        .catch((err) => {
          console.log("Cart Fetch Error", err);
          setproductcount(0);
        });
    } else {
      setisLogin(false);
      setproductcount(0);
    }
  };

  fetchCart(); 
  window.addEventListener("cartUpdate", fetchCart);

  return () => {
    window.removeEventListener("cartUpdate", fetchCart);
  };
}, []);


  const handlelogout = ()=>{
    const Logout = window.confirm("Are you sure you want to logout?")

    if (Logout){
      sessionStorage.clear();
    setisLogin(false)
    setName("")
    navigate("/")
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3 "
      style={{ backgroundColor: "#eceff185" }}
    >
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          alt="Logo"
          src="/assests/images/Logo/logo.png"
          style={{ height: "60px", objectFit: "contain" }}
        />
      </Link>
      {/* <Link to="/login"><button className="btn" style={{backgroundColor:"#e25594ff", fontWeight:"500", color:"white"}}>Sign in</button></Link> */}
      
      {isLogin?(
        <div className="dropdown">
    <button
      className="btn dropdown-toggle d-flex align-items-center"
      type="button"
      id="userDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ fontFamily: "cursive", fontSize: "18px", background: "none", border: "none" }}
    >
      <PersonOutlinedIcon style={{ fontSize: "30px", marginRight: "5px",}} />
      Welcome {Name}
    </button>
     <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
      <li>
        <Link className="dropdown-item" to="/userprofile"><PersonOutlinedIcon></PersonOutlinedIcon>Profile</Link>
      </li>
      <li>
        <button className="dropdown-item" onClick={handlelogout}><LogoutOutlinedIcon></LogoutOutlinedIcon>Logout</button>
      </li>
    </ul>
  </div>
      ):(
        <Link to="/login"><button className="btn" style={{backgroundColor:"#e25594ff", fontWeight:"500", color:"white"}}>Sign in</button></Link>
      )}

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav align-items-center">
          <li className="nav-item mx-2">
            <Link className="nav-link fw-semibold text-uppercase" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item dropdown mx-2">
            <Link
              className="nav-link dropdown-toggle fw-semibold text-uppercase"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Products
            </Link>
            <ul
              className="dropdown-menu border-0 shadow"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link
                  to="/lipstick"
                  className="dropdown-item fw-semibold text-dark"
                >
                  Lipstick
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item fw-semibold text-dark"
                  to="/blush"
                >
                  Blush
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item fw-semibold text-dark"
                  to="/foundation"
                >
                  Foundation
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item fw-semibold text-dark"
                  to="/eyeshadow"
                >
                  Eyeshadow
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link fw-semibold text-uppercase" to="/about">
              About us
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link fw-semibold text-uppercase" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
        
        {isLogin?(
  <Link to="/usercart"><button  
  style={{
    border: "none",
    background: "none",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer"
  }}
>
  <ShoppingCartOutlinedIcon style={{ color: "crimson", fontSize: "30px" }} />
  <div
    style={{
      backgroundColor: "crimson",
      borderRadius: "100px",
      color: "white",
      padding: " .01px 5px .01px 5px",
      fontWeight: "bold",
      display: "inline-block",
      textDecoration: "none",
      marginBottom:"25px",
      marginLeft:"-10px"
    }}
  >
    {productcount}
  </div>
</button></Link>
        ):(
            <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
