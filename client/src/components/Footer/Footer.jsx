import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li><i className="fas fa-phone"></i> +1 111-111-1111</li>
            <li><i className="fas fa-envelope"></i> Travelnest@Gmail.Com</li>
            <li><i className="fas fa-map-marker-alt"></i> Mississauga, Toronto</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Book With Confidence</h3>
          <ul>
            <li><i className="fas fa-book"></i> Booking Guidelines</li>
            <li><i className="fas fa-file-contract"></i> Terms And Conditions</li>
            <li><i className="fas fa-user-secret"></i> Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <i className="fab fa-linkedin"></i> LinkedIn
            </li>
            <li>
              <i className="fab fa-facebook"></i> Facebook
            </li>
            <li>
              <i className="fab fa-instagram"></i> Instagram
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>@Travel Nest, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;