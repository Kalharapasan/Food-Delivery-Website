import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './AdminLogin.css'

const AdminLogin = () => {

  const [currState, setCurrState] = useState("Sign In")
  const [data, setData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  return (
    <div>AdminLogin</div>
  )
}

export default AdminLogin