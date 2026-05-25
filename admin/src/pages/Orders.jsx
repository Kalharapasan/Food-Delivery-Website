import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'
import './Orders.css'

const STATUS_OPTIONS = ['Food Processing', 'Out for Delivery', 'Delivered']

const Orders = ({ url, token }) => {

  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error(response.data.message || 'Error fetching orders')
      }
    } catch (error) {
      toast.error('Network error fetching orders')
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Status updated')
        await fetchAllOrders()
      } else {

      }
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter)

  if (loading) return <div className='orders-loading'>Loading orders...</div>

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
          <button className='refresh-btn' onClick={fetchAllOrders}>↻ Refresh</button>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <div className='no-orders'>No orders found for "{filter}"</div>
      ) : (
        <div className='order-list'>
          {filteredOrders.map((order, index) => (
            <div key={index} className='order-card'>
              <div className='order-card-left'>
                <img src={assets.parcel_icon} alt='Order' className='order-icon' />
                <div className='order-details'>
                  <p className='order-id'>#{order._id.substring(0, 12)}...</p>
                  <div className='order-items-text'>
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} <small>×{item.quantity}</small>
                        {i < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                  <div className='order-customer'>
                    <strong>{order.address.firstName} {order.address.lastName}</strong>
                    <span>{order.address.phone}</span>
                  </div>
                  <div className='order-address'>
                    {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}
                  </div>
                </div>
              </div>
              <div className='order-card-right'>
                <div className='order-meta'>
                  <span className='order-amount'>${order.amount.toFixed(2)}</span>
                  <span className='order-count'>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                  <span className='order-date'>{new Date(order.date).toLocaleDateString()}</span>
                  <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                    {order.payment ? '✓ Paid' : '✗ Unpaid'}
                  </span>
                </div>
                <select
                  className={`status-select ${statusColor(order.status)}`}
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders