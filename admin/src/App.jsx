import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "")

  return (
    <div>

    </div>
  )
}

export default App
