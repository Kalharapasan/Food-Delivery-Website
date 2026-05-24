import React from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Add.css'


const Add = () => {

  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!image) {
      toast.error('Please upload a food image')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)

  }


  return (
    <div className='add'>

      <div className='add-header'>
        <h2>Add New Food Item</h2>
        <p>Fill in the details to add a new item to your menu</p>
      </div>

      <form className='add-form' onSubmit={onSubmitHandler}>


        <div className='add-img-upload'>
          <p>Food Image</p>
          <label htmlFor='image' className='image-upload-label'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt='Preview' className='preview-img' />
            ) : (
              <div className='upload-placeholder'>
                <img src={assets.upload_area} alt='Upload' />
                <span>Click to upload image</span>
              </div>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            accept='image/*'
            hidden
            required
          />
        </div>

        <div className='form-group'>
          <label>Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='e.g. Classic Caesar Salad'
            required
          />
        </div>

        <div className='form-group'>
          <label>Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='4'
            placeholder='Describe the dish, ingredients, and flavors...'
            required
          />
        </div>

        <div className='form-row'>

          <div className='form-group'>
            <label>Category</label>
            <select onChange={onChangeHandler} name='category' value={data.category}>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Price (USD)</label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='e.g. 12.99'
              min='0'
              step='0.01'
              required
            />
          </div>
        </div>
        <button type='submit' className='add-btn' disabled={loading}>
          {loading ? 'Adding...' : '+ Add Food Item'}
        </button>
      </form>
    </div>
  )
}

export default Add