import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets'
import axios from 'axios'


const STATUS_STEPS = ['Food Processing', 'Out for Delivery', 'Delivered']

const OrderStatusTracker = ({ status }) => {
  const currentStep = STATUS_STEPS.findIndex(s => s.toLowerCase() === status?.toLowerCase())
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '16px 0' }}>
      {STATUS_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
              background: i <= currentStep ? 'var(--accent)' : 'var(--border)',
              color: i <= currentStep ? 'white' : 'var(--text-muted)',
              transition: 'all 0.3s', flexShrink: 0
            }}>
              {i <= currentStep ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i <= currentStep ? 'var(--accent)' : 'var(--text-muted)', marginTop: 6, textAlign: 'center', fontWeight: i === currentStep ? 700 : 400, maxWidth: 70 }}>
              {step}
            </span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div style={{
              height: 2, flex: 1, background: i < currentStep ? 'var(--accent)' : 'var(--border)',
              marginTop: -20, transition: 'all 0.3s'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchOrders = async (isRefresh = false) => {
    if (!token) return isRefresh ? setRefreshing(true) : setLoading(true)
    try {
      const res = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } })
      if (res.data.success) setOrders((res.data.data || []).reverse())

    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { fetchOrders() }, [token])

  const statusClass = (status) => {
    const map = {
      'food processing': 'food-processing',
      'out for delivery': 'out-for-delivery',
      'delivered': 'delivered',
      'pending': 'pending',
    }
  }

  return (
    <div>MyOrders</div>
  )
}
