import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/' end className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <img src={assets.order_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar