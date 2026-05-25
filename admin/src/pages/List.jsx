import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './List.css'

const List = () => {
  
  return (
    <div className='list'>

      <div className='list-header'>
        <div>
          <h2>Food Items</h2>
          <p>{list.length} items on menu</p>
        </div>
      </div>


    </div>
  )
}

export default List