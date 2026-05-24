import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import './Dashboard.css'


const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

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
        /><StatCard
          label='Menu Items'
          value={data.totalFoods}
          trend='Items available'
          icon='🍔'
          colorClass='green'
        />
       </div>

    </div>
  )
}

export default Dashboard