import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="pretty-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-branding">
            <h2 className="brand-title">Perfectly Preety</h2>
            <p className="brand-tagline">Empowering beauty through elegance & innovation.</p>
            <div className="footer-icons">
              <Link to="https://instagram.com/pretty_perfect_beauty" target="_blank"><InstagramIcon /></Link>
              <Link href="https://x.com/prettycosmetics" target="_blank"><TwitterIcon /></Link>
              <Link href="https://facebook.com/perfectlyprettycosmetics" target="_blank"><FacebookRoundedIcon /></Link>
              <Link href="https://linkedin.com/company/prettycosmetics" target="_blank"><LinkedInIcon /></Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blush">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-info">
            <h4>Support</h4>
            <ul>
              <li><Link to="#">Terms & Conditions</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">Help</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Perfectly Preety. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
