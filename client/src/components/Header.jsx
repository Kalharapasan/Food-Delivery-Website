import React from 'react'
import headerImage from '../../assets/header_im.jpg'

const Header = () => {
  return (
    <div className='header' style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="header-overlay" />
      <div className="header-contents">
        <div className="header-badge">
          🔥 Free delivery on first order
        </div>
        <h2>
          Order your <em>favourite</em><br />Food here
        </h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and delivered fresh to your door.
        </p>
      </div>
    </div>
  )
}

export default Header