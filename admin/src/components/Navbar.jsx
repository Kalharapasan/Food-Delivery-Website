import React from 'react'
import { assets } from '../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Logo" />
      </div>
    </div>
  )
}

export default Navbar