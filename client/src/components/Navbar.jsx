import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Navbar = ({ setShowLogin }) => {

    const handleSearchSelect = (item) => {
        
    }

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

            <div className="navbar-search" ref={searchRef} style={{ position: 'relative' }}>
                <SearchIcon />

                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setShowSearch(true) }}
                    onFocus={() => setShowSearch(true)}
                />

                {showSearch && searchResults.length > 0 && (
                    <div className="search-results-panel">
                        {searchResults.map(item => (
                            <div
                                key={item._id}
                                className="search-result-item"
                                onClick={() => handleSearchSelect(item)}
                            >
                                <img src={`${url}/image/${item.image}`} alt={item.name} />
                                <div>
                                    <div className="search-result-name">{item.name}</div>
                                    <div className="search-result-category">{item.category}</div>
                                </div>
                                <div className="search-result-price" style={{ marginLeft: 'auto' }}>${item.price}</div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </nav>
    )
}
export default Navbar