import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets'
import axios from 'axios'


const STATUS_STEPS = ['Food Processing', 'Out for Delivery', 'Delivered']

const OrderStatusTracker = ({ status }) => {
  const currentStep = STATUS_STEPS.findIndex(s => s.toLowerCase() === status?.toLowerCase())
  return (

  )
}

export const MyOrders = () => {
  return (
    <div>MyOrders</div>
  )
}
