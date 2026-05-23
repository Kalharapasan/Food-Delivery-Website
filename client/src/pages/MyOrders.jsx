import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets'
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

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchOrders = async (isRefresh = false) => {
    if (!token) return
    isRefresh ? setRefreshing(true) : setLoading(true)
    try {
      const res = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } })
      if (res.data.success) setOrders((res.data.data || []).reverse())
    } catch (err) {
      console.error('Failed to fetch orders:', err)
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
      ) : (
        orders.map((order, index) => (
          <div key={order._id || index} className={`order-card${expanded === index ? ' expanded' : ''}`}>
            <div className="order-summary-row" onClick={() => setExpanded(expanded === index ? null : index)}>
              <div className="order-main-info">
                <div className="parcel-icon-wrapper">
                  <img src={assets.parcel_icon} alt="Order" />
                </div>
                <div>
                  <p className="order-id">Order <span>#{(order._id || '').substring(18) || String(index + 1).padStart(4, '0')}</span></p>
                  <p className="order-date">{order.date ? new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                </div>
              </div>

              <div className="order-stats-box">
                <p className="order-amount">${order.amount?.toFixed(2)}</p>
                <p className="order-item-count">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</p>
              </div>

              <div>
                <span className={`status-badge ${statusClass(order.status)}`}>
                  <span className="status-dot" />
                  {order.status || 'Pending'}
                </span>
              </div>

              <div className="order-actions-row">
                <button
                  className="track-btn"
                  onClick={e => { e.stopPropagation(); fetchOrders(true) }}
                >
                  Track
                </button>
                <button className="expand-btn">
                  {expanded === index ? '−' : '+'}
                </button>
              </div>
            </div>

            {expanded === index && (
              <div className="order-expanded-content">
                <div className="order-items-list">
                  <h4>Items Ordered</h4>
                  <OrderStatusTracker status={order.status} />
                  {order.items?.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <div className="order-item-name">
                        <span className="item-qty-pill">{item.quantity}×</span>
                        {item.name}
                      </div>
                      <span className="order-item-price" style={{ fontWeight: 700 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-details">
                  <h4>Delivery Address</h4>
                  <div className="order-address">
                    <p style={{ fontWeight: 600 }}>
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <p>{order.address?.street}</p>
                    <p>{order.address?.city}, {order.address?.state} {order.address?.zipcode}</p>
                    <p>{order.address?.country}</p>
                    {order.address?.phone && <p>📞 {order.address.phone}</p>}
                  </div>

                  <div style={{ marginTop: 20, borderTop: '1px solid var(--border-light)', paddingTop: 14 }}>
                    <h4 style={{ marginBottom: 10 }}>Payment Summary</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      <span>Subtotal</span>
                      <span>${(order.amount - 2).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>
                      <span>Delivery</span>
                      <span>$2.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: 'var(--accent)' }}>
                      <span>Total Paid</span>
                      <span>${order.amount?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders
