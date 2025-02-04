import React from "react";
import '../styles/Footer.css';
function Footer() {
    return(
    <footer className="footer">
            <div className="footer-content">
                <p className="footer-description">
                    Convenience is our priority to satisfy our customers, and we provide all the features you can easily and quickly.
                </p>
                <div className="footer-links">
                    <div className="footer-section">
                        <h4>About</h4>
                        <ul>
                            <li>How to Book</li>
                            <li>Contact Us</li>
                            <li>Help Center</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Products</h4>
                        <ul>
                            <li>Destination</li>
                            <li>Ride</li>
                            <li>Guide</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Social</h4>
                        <ul className="social-links">
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 ExploreMate. All rights reserved.</p>
            </div>
        </footer>
    );
}
export default Footer;