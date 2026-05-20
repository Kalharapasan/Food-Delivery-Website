import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Navbar = ({ setShowLogin }) => {
    return (
        <nav className="navbar">
            
            <Link to="/">
                <img className="logo" src={assets.logo} alt="Logo" />
            </Link>
           
            <ul className="navbar-menu">
                {navLinks.map(link => (
                    <li key={link.label}>
                        {link.path ? (
                            <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                                {link.label}
                            </Link>
                        ) : (
                            <a href={link.href}>{link.label}</a>
                        )}
                    </li>
                ))}
            </ul>


        </nav>
    )
}
export default Navbar