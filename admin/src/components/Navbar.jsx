import React from 'react'
import { assets } from '../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Logo" />
        <div className='navbar-right'>
          <span className='admin-badge'>Admin</span>
          {logout && (
            <button className='logout-btn' onClick={logout}>
              Logout
            </button>
          )}
          <img className='profile' src={assets.profile_image} alt="Profile" />
        </div>
      </div>
    </div>
  )
}

export default Navbar