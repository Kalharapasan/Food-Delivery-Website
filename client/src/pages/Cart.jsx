import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const {
        cartItem, food_list, removeFromCart, addToCart,
        clearCartItem, getTotalCartAmount, url, token
    } = useContext(StoreContext)
    const navigate = useNavigate()
    const [promoCode, setPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const [promoError, setPromoError] = useState('')
    const [promoSuccess, setPromoSuccess] = useState('')
    const PROMO_CODES = { 'SAVE10': 10, 'FIRST20': 20, 'WELCOME15': 15 }
    const cartItems = food_list.filter(item => cartItem[item._id] > 0)
    const subtotal = getTotalCartAmount()
    const delivery = subtotal === 0 ? 0 : 2
    const discountAmount = subtotal * (discount / 100)
    const total = subtotal + delivery - discountAmount

    const applyPromo = () => {
        const code = promoCode.toUpperCase().trim()
        if (PROMO_CODES[code]) {
            setDiscount(PROMO_CODES[code])
            setPromoSuccess(`🎉 ${PROMO_CODES[code]}% discount applied!`)
            setPromoError('')
        } else {
            setPromoError('Invalid promo code')
            setPromoSuccess('')
            setDiscount(0)
        }
    }

     if (cartItems.length === 0) {
         return (
            <div className="cart">
                
            </div>
         )
     }

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
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Delivery fee</span>
                            <span>{delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}</span>
                        </div>
                        {discount > 0 && (
                            <div className="summary-line" style={{ color: 'var(--green)' }}>
                                <span>Discount ({discount}%)</span>
                                <span>−${discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="summary-line total">
                            <span>Total</span>
                            <span className="amount">${total.toFixed(2)}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={() => {
                                if (!token) { alert('Please sign in to checkout'); return }
                                navigate('/order')
                            }}
                        >Proceed to Checkout
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
                            🔒 Secure checkout powered by Stripe
                        </p>
                    </div>
                    <div className="promo-card">
                        <h4>
                            <span>🎟️</span> Promo Code
                        </h4>
                        <div className="promo-input-row">
                            <input
                                type="text"
                                placeholder="Enter code..."
                                value={promoCode}
                                onChange={e => { setPromoCode(e.target.value); setPromoError(''); setPromoSuccess('') }}
                                onKeyDown={e => e.key === 'Enter' && applyPromo()}
                            />
                            <button className="promo-apply-btn" onClick={applyPromo}>Apply</button>
                        </div>
                        {promoError && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 8 }}>{promoError}</p>}
                        {promoSuccess && <p style={{ fontSize: 12, color: 'var(--green)', marginTop: 8 }}>{promoSuccess}</p>}
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                            Try: SAVE10, FIRST20, WELCOME15
                        </p>
                    </div>

                </div>

            </div>


        </div>
    )

}

export default Cart