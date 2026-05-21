import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'


const PlaceOrder = () => {
    
    
    return(
        <div className="place-order">

            <form onSubmit={placeOrder} className="place-order-left">
                
            </form>


        </div>
    )
}

export default PlaceOrder