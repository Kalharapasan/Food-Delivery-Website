import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Verify = () => {
    const [searchParams] = useSearchParams()
    const { url, token, setCartItem, addToast } = useContext(StoreContext)
    const navigate = useNavigate()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const [status, setStatus] = useState('loading') 

    useEffect(() => {
        
    })


    return (
        <div>

        </div>
    )
}


export default Verify
