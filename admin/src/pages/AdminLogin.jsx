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
      AdminLogin
    </div>
  )
}

export default AdminLogin