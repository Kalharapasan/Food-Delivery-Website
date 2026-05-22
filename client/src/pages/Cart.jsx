import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    return (
        <div className="cart">

            <h1 className="cart-page-title">Your Cart</h1>
            <p className="cart-subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>

            <div className="cart-layout">

                {/* Items table */}
                <div className="cart-items">
                    <div className="cart-table-header">

                    </div>
                </div>

            </div>


        </div>
    )

}

export default Cart