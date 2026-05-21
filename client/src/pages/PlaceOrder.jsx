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

                        </div>
                    </div>

                </div>
            </form>


        </div>
    )
}

export default PlaceOrder