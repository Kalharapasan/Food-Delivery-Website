import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import './Dashboard.css'

const StatCard = ({ label, value, trend, icon, colorClass }) => (
  <div className={`stat-card ${colorClass}`}>
    <div className='stat-icon'>{icon}</div>
  </div>
)

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${url}/api/order/summary`, { headers: { token } })
      if (response.data.success) {
        setData(response.data.data)
      } else {
        toast.error(response.data.message || 'Error fetching stats')
      }
    } catch (error) {
      toast.error('Network error loading dashboard')
    } finally {
      setLoading(false)
    }

  }
  useEffect(() => {
    fetchSummary()
  }, [])

  if (loading) return <div className='dashboard-loading'>Loading dashboard...</div>
  if (!data) return <div className='dashboard-loading'>No data available.</div>

  const statusColors = {
    'Food Processing': '#f97316',
    'Out for Delivery': '#3b82f6',
    'Delivered': '#16a34a'
  }

  return (
    <div className='dashboard'>

      <div className='dashboard-top'>
        <div>
          <h1>Dashboard</h1>
          <p>Real-time overview of your food delivery platform</p>
        </div>
        <button className='refresh-dash-btn' onClick={fetchSummary}>↻ Refresh</button>
      </div>

      <div className='stat-cards'>
        <StatCard
          label='Total Revenue'
          value={`$${data.totalRevenue.toLocaleString()}`}
          trend='From paid orders'
          icon='💰'
          colorClass='orange'
        />
        <StatCard
          label='Total Orders'
          value={data.totalOrders}
          trend={`${Object.values(data.statusStats).reduce((a, b) => a + b, 0)} tracked`}
          icon='📦'
          colorClass='blue'
        />
        <StatCard
          label='Menu Items'
          value={data.totalFoods}
          trend='Items available'
          icon='🍔'
          colorClass='green'
        />
        <StatCard
          label='Total Users'
          value={data.totalUsers}
          trend='Registered customers'
          icon='👥'
          colorClass='purple'
        />
      </div>

      <div className='dashboard-grid'>

        <div className='recent-orders-panel'>
          <div className='panel-header'>
            <h3>Recent Orders</h3>
            <span className='badge'>{data.latestOrders.length} latest</span>
          </div>
          <div className='orders-mini'>
            {data.latestOrders.length === 0 ? (
              <p className='empty-state'>No recent orders</p>
            ) : (
              data.latestOrders.map((order, i) => (
                <div key={i} className='order-mini-row'>
                  <img src={assets.parcel_icon} alt='' className='mini-icon' />
                  <div className='mini-info'>
                    <span className='mini-id'>#{order._id?.substring(0, 10)}...</span>
                    <span className='mini-date'>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <span className='mini-amount'>${order.amount?.toFixed(2)}</span>
                  <span
                    className='mini-status'
                    style={{ color: statusColors[order.status] || '#64748b' }}
                  >
                    ● {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='distribution-panel'>
          <div className='panel-header'>
            <h3>Order Status Distribution</h3>
          </div>
          {data.totalOrders === 0 ? (
            <p className='empty-state'>No orders yet</p>
          ) : (
            <div className='status-bars'>
              {Object.entries(data.statusStats).map(([status, count]) => {
                const pct = Math.round((count / data.totalOrders) * 100)
                return (
                  <div key={status} className='status-bar-item'>
                    <div className='bar-label'>
                      <span>{status}</span>
                      <span>{count} ({pct}%)</span>
                    </div>
                    <div className='bar-track'>
                      <div
                        className='bar-fill'
                        style={{
                          width: `${pct}%`,
                          background: statusColors[status] || '#94a3b8'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default Dashboard