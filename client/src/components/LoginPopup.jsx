import React, { useState, useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)

const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
)

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

const LoginPopup = ({ setShowLogin }) => {
    const { login, register } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [agreed, setAgreed] = useState(false)

    const [data, setData] = useState({ name: '', email: '', password: '' })
    return (
        <div className='login-popup' onClick={e => e.target === e.currentTarget && setShowLogin(false)}>
            <form className="login-popup-container" onSubmit={onSubmit}>

                <button
                    type="button"
                    className="login-popup-close"
                    onClick={() => setShowLogin(false)}
                >
                    ✕
                </button>

                <div className="login-popup-brand">
                    <div className="brand-dot">🍽️</div>
                    <span>Mr.Chai</span>
                </div>

                <div className="login-popup-title">
                    <h2>{currState === 'Login' ? 'Welcome back' : 'Create account'}</h2>
                    <p>
                        {currState === 'Login'
                            ? 'Sign in to access your orders and cart'
                            : 'Join us and start ordering your favourite food'}
                    </p>
                </div>

                {currState === 'Sign Up' && (
                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <UserIcon />
                            <input
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={data.name}
                                onChange={onChange}
                                required
                                autoComplete="name"
                            />
                        </div>
                    </div>
                )}

                <div className="input-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                        <MailIcon />

                    </div>
                </div>

            </form>
        </div>
    )
}