import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'

const StarIcon = ({ filled }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const Fooditem = ({ id, name, price, description, image, category, isNew, isPopular }) => {

    const { cartItem, addToCart, removeFromCart, url, wishlist, toggleWishlist, token } = useContext(StoreContext)
    const [imgError, setImgError] = useState(false)


    return (

    )

}
export default Fooditem