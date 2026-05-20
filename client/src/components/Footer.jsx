import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='footer' id='footer'>

            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="logo-row">
                        <img src={assets.logo} alt="Mr.Chai" />
                        <span>Mr.Chai</span>
                    </div>
                    <p>
                        Delivering happiness one meal at a time. Your favourite restaurant meals, delivered fresh and fast to your doorstep.
                    </p>
                </div>
                <div className="footer-social">
                    <div className="social-icon" title="Facebook">𝗙</div>
                    <div className="social-icon" title="Twitter">𝕏</div>
                    <div className="social-icon" title="Instagram">◈</div>
                    <div className="social-icon" title="LinkedIn">in</div>
                </div>
            </div>

            <div className="footer-col">
                <h4>Company</h4>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </div>

            <div className="footer-col">
                
            </div>


        </footer>
    )
}

export default Footer