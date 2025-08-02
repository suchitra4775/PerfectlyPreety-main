import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Get } from "../utilities/HttpService (3)";


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      alert("Please log in to view profile.");
      navigate("/login");
      return;
    }

    // Replace 'users' with your actual user endpoint
    Get(`http://localhost:8888/loginuser?name=${username}`)
      .then((res) => {
        if (res.length > 0) {
          setUserData(res[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user data", err);
      });
  }, [username, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const genderIcon = (gender)=>{
    switch(gender?.toLowerCase()){
        case "female":
            return <Person2Icon style={{ color: "#e91e63", fontSize: 60, marginRight: 10 }}></Person2Icon>
        case "male":
            return <PersonIcon style={{ color: "#3f51b5", fontSize: 30, marginRight: 10 }} ></PersonIcon>
        default:
            return <AccountCircleIcon style={{ color: "#9e9e9e", fontSize: 30, marginRight: 10 }}></AccountCircleIcon>
    }

  }

  return (
    <div>
        <Navbar/>
      <div className="container py-5">
        <h2 className="text-center mb-4">User Profile</h2>

        {userData ? (
          <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
            <div style={{textAlign:"center"}}>{genderIcon(userData.gender)}</div>
            <h4 className="mb-3 text-center">
                Welcome, {userData.name} 👋</h4>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.contact || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {userData.dob || "N/A"}</p>
            <p><strong>Gender:</strong> {userData.gender || "N/A"}</p>

            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center">Loading user data...</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default UserProfile;
