import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets'

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)

const CartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
)

const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
)

const OrdersIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
    </svg>
)

const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
)

const Navbar = ({ setShowLogin }) => {
    const {
        getTotalCartCount, token, logout,
        searchQuery, setSearchQuery, searchResults, url
    } = useContext(StoreContext)

    const navigate = useNavigate()
    const location = useLocation()
    const searchRef = useRef(null)
    const [showSearch, setShowSearch] = useState(false)

    const cartCount = getTotalCartCount ? getTotalCartCount() : 0

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Menu', anchor: 'explore-menu' },
        { label: 'Contact', anchor: 'footer' },
    ]

    const handleAnchorClick = (anchor) => {
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
            }, 300)
        } else {
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleSearchSelect = (item) => {
        setSearchQuery('')
        setShowSearch(false)
        navigate('/')
        setTimeout(() => {
            document.getElementById('food-display')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
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
                            <a href={`#${link.anchor}`} onClick={(e) => { e.preventDefault(); handleAnchorClick(link.anchor) }}>
                                {link.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>

            {/* Search */}
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

            <div className="navbar-right">
                {/* Cart */}
                <Link to="/cart" className="navbar-cart-btn">
                    <CartIcon />
                    <span>Cart</span>
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>

                {/* Auth */}
                {!token ? (
                    <button className="navbar-signin-btn" onClick={() => setShowLogin(true)}>
                        Sign In
                    </button>
                ) : (
                    <div className="navbar-profile">
                        <button>
                            <div className="profile-avatar"><UserIcon /></div>
                            <span className="profile-name">Account</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                        </button>
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <OrdersIcon /> My Orders
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <LogoutIcon /> Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
