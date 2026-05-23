import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './AdminLogin.css'

const AdminLogin = () => {

  const [currState, setCurrState] = useState("Sign In")
  const [data, setData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let newUrl = url;
    if (currState === "Sign In") {
      newUrl += "/api/user/admin/login";
    } else {
      newUrl += "/api/user/admin/register";
    }
    try {
      const response = await axios.post(newUrl, data)
      if (response.data.success) {
        setToken(response.data.token)
        toast.success(currState === "Sign In" ? 'Welcome back, Admin!' : 'Admin registered successfully!')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Network error. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='admin-login-page'>
      <div className='admin-login-box'>

        <div className='admin-login-header'>
          <div className='admin-logo-circle'>
            <span>🍽️</span>
          </div>
          <h1>Admin Portal</h1>
          <p>{currState === "Sign In" ? "Sign in to manage your food delivery platform" : "Register a new admin account"}</p>
        </div>
        <form onSubmit={onSubmit} className='admin-login-form'>
          {currState === "Sign In" ? <></> : (
            <div className='input-group'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                placeholder='Your name'
                value={data.name}
                onChange={onChangeHandler}
                required
              />
            </div>
          )}
          <div className='input-group'>
            <label>Email Address</label>
            <input
              type='email'
              name='email'
              placeholder='admin@example.com'
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className='input-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='••••••••'
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <button type='submit' className='admin-login-btn' disabled={loading}>
            {loading ? (currState === "Sign In" ? 'Signing in...' : 'Registering...') : (currState === "Sign In" ? 'Sign In' : 'Register')}
          </button>
        </form>
        {currState === "Sign In"
          ? <p className='admin-login-note'>Don't have an admin account? <span onClick={() => setCurrState("Register")}>Click here</span></p>
          : <p className='admin-login-note'>Already have an admin account? <span onClick={() => setCurrState("Sign In")}>Login here</span></p>
        }


      </div>
    </div>
  )
}

export default AdminLogin