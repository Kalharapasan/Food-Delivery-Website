import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './List.css'

const List = () => {
  const [list, setList] = useState([])

  return (
    <div className='list'>

      <div className='list-header'>
        <div>
          <h2>Food Items</h2>
          <p>{list.length} items on menu</p>
        </div>
        <div className='list-search'>
          <input
            type='text'
            placeholder='Search by name or category...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='list-table-wrapper'>
        
        <div className='list-table-head'>

        </div>
        
      </div>


    </div>
  )
}

export default List