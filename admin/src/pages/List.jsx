import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './List.css'

const List = () => {
  const [list, setList] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [editData, setEditData] = useState({ name: '', description: '', price: '', category: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)


  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.foods)
      } else {
        toast.error('Error fetching food list')
      }
    } catch (err) {
      toast.error('Server error fetching list')
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async (foodId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId }, { headers: { token } })
      if (response.data.success) {
        toast.success('Item removed successfully')
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error('Error removing item')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

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
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {filteredList.length === 0 ? (
          <div className='list-empty'>No items found</div>
        ) : (
          filteredList.map((item) => (
            <div key={item._id} className='list-table-row'>
              {editingItem === item._id ? (
                <div className='edit-row'>
                  <img src={`${url}/image/${item.image}`} alt={item.name} className='list-item-img' />
                  <div className='edit-fields'>
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData(p => ({ ...p, name: e.target.value }))}
                      placeholder='Name'
                    />
                    <input
                      value={editData.price}
                      type='number'
                      onChange={(e) => setEditData(p => ({ ...p, price: e.target.value }))}
                      placeholder='Price'
                    />
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData(p => ({ ...p, category: e.target.value }))}
                    >
                      {['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className='edit-actions'>
                    <button className='save-btn' onClick={() => saveEdit(item._id)}>Save</button>
                    <button className='cancel-btn' onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <img src={`${url}/image/${item.image}`} alt={item.name} className='list-item-img' />
                  <p className='item-name'>{item.name}</p>
                  <span className='category-badge'>{item.category}</span>
                  <p className='item-price'>${Number(item.price).toFixed(2)}</p>
                  <div className='list-actions'>
                    <button className='edit-btn' onClick={() => startEditing(item)} title='Edit'>
                      ✏️ Edit
                    </button>
                    <button className='delete-btn' onClick={() => removeFood(item._id)} title='Delete'>
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}

      </div>


    </div>
  )
}

export default List