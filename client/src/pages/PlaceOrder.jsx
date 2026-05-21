import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'


const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '', zipcode: '', country: '',
        phone: ''
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})


    return (
        <div className="place-order">

            <form onSubmit={placeOrder} className="place-order-left">
                <h2>Checkout</h2>
                <div className="form-card">

                    <h3>
                        <span className="step-num">1</span>
                        Delivery Information
                    </h3>

                    <div className="form-row">
                        <div className="form-field">
                            <label>First Name</label>
                            <input
                                name="firstName" placeholder="John"
                                value={data.firstName} onChange={onChange}
                                style={{ borderColor: errors.firstName ? '#EF4444' : undefined }}
                            />
                            {errors.firstName && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.firstName}</span>}
                        </div>
                        <div className="form-field">
                            <label>Last Name</label>
                            <input
                                name="lastName" placeholder="Doe"
                                value={data.lastName} onChange={onChange}
                                style={{ borderColor: errors.lastName ? '#EF4444' : undefined }}
                            />
                            {errors.lastName && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label>Email</label>
                            <input
                                name="email" type="email" placeholder="you@example.com"
                                value={data.email} onChange={onChange}
                                style={{ borderColor: errors.email ? '#EF4444' : undefined }}
                            />
                            {errors.email && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.email}</span>}
                        </div>
                        <div className="form-field">
                            <label>Phone</label>
                            <input
                                name="phone" type="tel" placeholder="+1 234 567 8900"
                                value={data.phone} onChange={onChange}
                                style={{ borderColor: errors.phone ? '#EF4444' : undefined }}
                            />
                            {errors.phone && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="form-field">
                        <label>Street Address</label>
                        <input
                            name="street" placeholder="123 Main Street"
                            value={data.street} onChange={onChange}
                            style={{ borderColor: errors.street ? '#EF4444' : undefined }}
                        />
                        {errors.street && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.street}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label>City</label>
                            <input
                                name="city" placeholder="New York"
                                value={data.city} onChange={onChange}
                                style={{ borderColor: errors.city ? '#EF4444' : undefined }}
                            />
                            {errors.city && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.city}</span>}
                        </div>
                        <div className="form-field">
                            <label>State</label>
                            <input
                                name="state" placeholder="NY"
                                value={data.state} onChange={onChange}
                                style={{ borderColor: errors.state ? '#EF4444' : undefined }}
                            />
                            {errors.state && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.state}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label>ZIP Code</label>
                            <input
                                name="zipcode" placeholder="10001"
                                value={data.zipcode} onChange={onChange}
                                style={{ borderColor: errors.zipcode ? '#EF4444' : undefined }}
                            />
                            {errors.zipcode && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.zipcode}</span>}
                        </div>
                        <div className="form-field">
                            <label>Country</label>
                            <input
                                name="country" placeholder="United States"
                                value={data.country} onChange={onChange}
                                style={{ borderColor: errors.country ? '#EF4444' : undefined }}
                            />
                            {errors.country && <span style={{ fontSize: 12, color: '#EF4444' }}>{errors.country}</span>}
                        </div>
                    </div>


                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 16 }}
                >
                    {loading ? 'Processing...' : 'Proceed to Payment →'}
                </button>
            </form>

            <div style={{ position: 'sticky', top: 90 }}>
                <div className="cart-summary">
                    <h3>Order Summary</h3>

                    {/* Items */}
                    <div style={{ marginBottom: 16 }}>
                        {cartItemsList.map(item => (
                            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <img
                                    src={`${url}/image/${item.image}`}
                                    alt={item.name}
                                    style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                                />
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>×{cartItem[item._id]}</p>
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 700 }}>
                                    ${(item.price * cartItem[item._id]).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-line">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Delivery</span>
                        <span>$2.00</span>
                    </div>
                    <div className="summary-line total">
                        <span>Total</span>
                        <span className="amount">${(subtotal + 2).toFixed(2)}</span>
                    </div>
                    <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        🔒 Secured by Stripe · SSL encrypted
                    </p>
                </div>
            </div>


        </div>
    )
}

export default PlaceOrder