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
    return map[status?.toLowerCase()] || 'pending'
  }

  return (
    <div className="my-orders">

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2>My Orders</h2>
          <p>Track and manage all your food orders</p>
        </div>
        <button
          onClick={() => fetchOrders(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px', background: 'var(--surface)',
            border: '1.5px solid var(--border)', borderRadius: 50,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            color: 'var(--text-secondary)', transition: 'all 0.22s'
          }}
          className={refreshing ? 'refreshing' : ''}
        >
          {refreshing ? '⟳ Refreshing...' : '↻ Refresh'}
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔄</div>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <div className="icon">📦</div>
          <h3>No orders yet</h3>
          <p>When you place your first order, it will appear here.</p>
          <button
            className="btn-primary"
            onClick={() => window.location.href = '/'}
            style={{ margin: '0 auto' }}
          >
            Start Ordering
          </button>
        </div>
      ) 
      )}

    </div>
  )
}
