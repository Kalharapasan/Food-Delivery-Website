import React from 'react'
import headerImage from '../../assets/header_im.jpg'

const Header = () => {
  return (
    <div className='header' style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="header-overlay" /> 
      <div className="header-contents">

      </div>
    </div>
  )
}

export default Header