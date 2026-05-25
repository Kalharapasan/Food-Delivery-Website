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

        </div>
      </div>

    </div>
  )
}

export default Orders