import React from 'react'
import { menu_list } from '../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>

            <div className="section-header">
                <div className="section-tag">Categories</div>
                <h2>Explore our menu</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes.</p>
            </div>

            <div className="explore-menu-list">
                {/* "All" pill */}
                <div
                    className={`explore-menu-list-item${category === 'All' ? ' selected' : ''}`}
                    onClick={() => setCategory('All')}
                >
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6B35, #E8441A)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 28, transition: 'transform 0.22s'
                    }}>
                        🍽️
                    </div>
                    <p>All</p>
                </div>

                {menu_list.map((item, index) => (
                    <div
                        key={index}
                        className={`explore-menu-list-item${category === item.menu_name ? ' selected' : ''}`}
                        onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
                    >
                        <img src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ExploreMenu
