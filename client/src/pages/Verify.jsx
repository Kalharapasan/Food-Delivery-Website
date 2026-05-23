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
        const verifyPayment = async () => {
            try {
                const res = await axios.post(
                    `${url}/api/order/verify`,
                    { success, orderId },
                    { headers: { token } }
                )

                if (res.data.success) {
                    setStatus('success')
                    setCartItem({})
                    addToast && addToast('Order placed successfully! 🎉', 'success')
                    setTimeout(() => navigate('/myorders'), 3000)
                } else {
                    setStatus('failed')
                    setTimeout(() => navigate('/cart'), 3000)
                }

            } catch (error) {
                setStatus('failed')
                setTimeout(() => navigate('/cart'), 3000)
            }
        }

        if (token) verifyPayment()
    }, [token, url, success, orderId, navigate, setCartItem, addToast])


    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px'
        }}>
            {status === 'loading' && (
                <div>
                    <div style={{ fontSize: 56, marginBottom: 20 }}>⏳</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, marginBottom: 12 }}>
                        Verifying payment...
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>Please wait while we confirm your order.</p>
                </div>
            )}

            {status === 'success' && (
                <div>
                    <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, marginBottom: 12, color: 'var(--green)' }}>
                        Order Confirmed!
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>
                        Your order has been placed successfully. Redirecting to your orders...
                    </p>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/myorders')}
                        style={{ margin: '0 auto' }}
                    >
                        View My Orders
                    </button>
                </div>
            )}

            {status === 'failed' && (
                <div>
                    <div style={{ fontSize: 72, marginBottom: 20 }}>😕</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, marginBottom: 12, color: '#EF4444' }}>
                        Payment Failed
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>
                        Your payment was not completed. Redirecting back to cart...
                    </p>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/cart')}
                        style={{ margin: '0 auto' }}
                    >
                        Back to Cart
                    </button>
                </div>
            )}
        </div>
    )
}


export default Verify
