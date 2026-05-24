import React from 'react'

const Add = () => {
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
              
            </div>


        </div>


      </form>


    </div>
  )
}

export default Add