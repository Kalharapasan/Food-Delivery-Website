import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const SearchIcon = () => (
    
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
        { label: 'Menu', href: '#explore-menu' },
        { label: 'App', href: '#app-download' },
        { label: 'Contact', href: '#footer' },
    ]

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