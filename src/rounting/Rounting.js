import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import About from "../pages/About";
import App from "../App";
import Contact from "../pages/Contact";
import Lipstick from "../pages/product/Lipstick";
import UserCart from "../users/UserCart";
import Blush from "../pages/product/Blush";
import Foundation from "../pages/product/Foundation";
import Eyeshadow from "../pages/product/Eyeshadow";
import Loginform from "../pages/LoginForm";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import UserRegister from "../pages/UserRegister";
import UserProfile from "../pages/UserProfile";
import Checkout from "../users/Checkout";
import Layout from "./Layout";
import PrivateComp from "./PrivateComp";
import TrackOrder from "../pages/Trackorder";
import Trackorder from "../pages/Trackorder";


const Rounting = createBrowserRouter([
  {
    path:"/",element:<PrivateComp>
      <Layout/>
      </PrivateComp>,
    children:[
    {path:"",element:<Home/>},
    { path: "about", element: <About /> },
    { path: "contact", element: <Contact /> },
    {path:"login",element:<Loginform/>},
    {path:"userregister",element:<UserRegister/>},
    {path:"userprofile",element:<UserProfile/>},

    //products
    {path:"lipstick",element:<Lipstick/>},
    {path:"blush",element:<Blush/>},
    {path:"foundation",element:<Foundation/>},
    {path:"eyeshadow",element:<Eyeshadow/>},

    //usercart
    {path:"usercart", element:<UserCart/>},
    {path:"checkout",element:<Checkout/>},
    {path:"trackorder",element:<Trackorder/>},

    // admin
    {path:"adminlogin",element:<AdminLogin/>},
    {path:"admindashboard",element:sessionStorage.getItem("Adminlogin")?(<AdminDashboard/>):(<Navigate to="/adminlogin"/>)}
  ]
},
]);

export default Rounting;
