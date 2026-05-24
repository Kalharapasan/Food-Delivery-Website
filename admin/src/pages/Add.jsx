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

        </div>
      </form>


    </div>
  )
}

export default Add