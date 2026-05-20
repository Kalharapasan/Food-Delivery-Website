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

    const count = cartItem[id] || 0
    const inWishlist = wishlist?.has(id)
    const rating = (((id?.charCodeAt(0) || 65) % 10) / 10 * 1.5 + 3.5).toFixed(1)
    const deliveryTime = `${15 + ((id?.charCodeAt(1) || 30) % 20)}-${25 + ((id?.charCodeAt(1) || 30) % 20)} min`

    return (
        <div className='food-item'>
            <div className="food-item-img-container">

                <img
                    className='food-item-image'
                    src={imgError ? '/placeholder-food.jpg' : `${url}/image/${image}`}
                    alt={name}
                    onError={() => setImgError(true)}
                />

                <div className="food-item-img-overlay" />

                {/* Badges */}
                <div className="food-item-badges">
                    {isNew && <span className="badge badge-new">New</span>}
                    {isPopular && <span className="badge badge-popular">Popular</span>}
                </div>

                {/* Wishlist */}
                <button
                    className={`wishlist-btn${inWishlist ? ' active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(id) }}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {inWishlist ? '❤️' : '🤍'}
                </button>

                {/* Cart controls */}
                <div className="food-item-actions">
                    {count === 0
                        ? (
                            <button className="add-btn" onClick={() => addToCart(id)} title="Add to cart">
                                +
                            </button>
                        )
                        : (
                            <div className="food-item-counter">
                                <button className="counter-minus" onClick={() => removeFromCart(id)}>−</button>
                                <span className="counter-num">{count}</span>
                                <button className="counter-plus" onClick={() => addToCart(id)}>+</button>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p className="food-item-name">{name}</p>
                    <div className="food-item-rating">
                        <span className="rating-star">★</span>
                        <span className="rating-num">{rating}</span>
                    </div>
                </div>
                <p className="food-item-desc">{description}</p>
                <div className="food-item-footer">
                    
                </div>
            </div>

        </div>
    )

}
export default Fooditem