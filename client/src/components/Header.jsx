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
        <div className="header-actions">
          <a href="#explore-menu" className="btn-primary">
            Explore Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#app-download" className="btn-secondary">
            Get the App
          </a>
        </div>
      </div>
      <div className="header-stats">
        <div className="stat-chip">
          <span className="num">50+</span>
          <span className="label">Restaurants</span>
        </div>
        <div className="stat-chip">
          <span className="num">200+</span>
          <span className="label">Dishes</span>
        </div>
        <div className="stat-chip">
          <span className="num">4.8★</span>
          <span className="label">Rating</span>
        </div>
      </div>
    </div>
  )
}

export default Header