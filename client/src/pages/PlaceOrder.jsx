import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'


const PlaceOrder = () => {


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


                </div>
            </form>


        </div>
    )
}

export default PlaceOrder