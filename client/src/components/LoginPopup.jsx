import React, { useState, useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

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

    const onChange = e => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const onSubmit = async e => {
        e.preventDefault()
        if (!agreed) { setError('Please agree to the terms'); return }
        setLoading(true)
        setError('')

        let result
        if (currState === "Login") {
            result = await login(data.email, data.password)
        } else {
            result = await register(data.name, data.email, data.password)
        }

        setLoading(false)
        if (result.success) {
            setShowLogin(false)
        } else {
            setError(result.message || 'Something went wrong')
        }
    }

    const switchState = (state) => {
        setCurrState(state)
        setError('')
        setData({ name: '', email: '', password: '' })
    }

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
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={data.email}
                            onChange={onChange}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                        <LockIcon />
                        <input
                            name="password"
                            type="password"
                            placeholder={currState === 'Login' ? '••••••••' : 'At least 8 characters'}
                            value={data.password}
                            onChange={onChange}
                            required
                            autoComplete={currState === 'Login' ? 'current-password' : 'new-password'}
                        />
                    </div>
                </div>

                {error && (
                    <div style={{
                        background: '#FEE2E2', color: '#EF4444', borderRadius: 8,
                        padding: '10px 14px', fontSize: 13, fontWeight: 500
                    }}>
                        {error}
                    </div>
                )}

                <div className="login-popup-condition">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="agree">
                        <p>By continuing, I agree to the <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Terms of Use</span> & <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Privacy Policy</span>.</p>
                    </label>
                </div>

                <button type="submit" className="login-popup-submit" disabled={loading}>
                    {loading
                        ? (currState === 'Login' ? 'Signing in...' : 'Creating account...')
                        : (currState === 'Login' ? 'Sign In' : 'Create Account')
                    }
                </button>

                <p className="login-popup-switch">
                    {currState === 'Login' ? (
                        <>Don't have an account? <span onClick={() => switchState('Sign Up')}>Sign up free</span></>
                    ) : (
                        <>Already have an account? <span onClick={() => switchState('Login')}>Sign in</span></>
                    )}
                </p>
            </form>
        </div>
    )
}

export default LoginPopup
