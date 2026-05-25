import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'
import './Orders.css'

const Orders = () => {


  return (
    <div className='order-page'>

      <div className='order-page-header'>
        <div>
          <h2>Order Management</h2>
          <p>{orders.length} total orders</p>
        </div>
        <div className='order-filters'>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value='All'>All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

    </div>
  )
}

export default Orders