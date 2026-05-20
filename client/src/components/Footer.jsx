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
                </div>
            </div>
        </footer>
    )
}

export default Footer