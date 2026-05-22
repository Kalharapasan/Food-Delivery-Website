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
                        <span>Product</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Total</span>
                        <span></span>
                    </div>
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item-row">
                            <div className="cart-item-product">
                                <img src={`${url}/image/${item.image}`} alt={item.name} />
                                <div className="cart-item-product-info">
                                    <p className="cart-item-name">{item.name}</p>
                                    <p className="cart-item-category">{item.category}</p>
                                </div>
                            </div>
                            <p className="cart-price">${item.price.toFixed(2)}</p>
                            <div className="cart-qty">
                                <button className="qty-btn" onClick={() => removeFromCart(item._id)}>−</button>
                                <span className="qty-num">{cartItem[item._id]}</span>
                                <button className="qty-btn" onClick={() => addToCart(item._id)}>+</button>
                            </div>
                            <p className="cart-total-price">${(item.price * cartItem[item._id]).toFixed(2)}</p>
                            <button className="remove-btn" onClick={() => clearCartItem(item._id)} title="Remove item">✕</button>
                        </div>
                    ))}

                </div>
                {/* Sidebar */}
                <div className="cart-sidebar">
                    {/* Summary */}
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-line">
                            
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )

}

export default Cart