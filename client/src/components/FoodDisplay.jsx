import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Fooditem from './Fooditem'

const SkeletonCard = () => (
    <div className="food-item-skeleton">
        <div className="skeleton skeleton-img" />
        <div className="skeleton-body">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line w-3/4" />
            <div className="skeleton skeleton-line w-1/2" />
        </div>
    </div>
)

const FoodDisplay = ({ category }) => {
    const { food_list, loading, searchQuery } = useContext(StoreContext)

    const filteredList = food_list.filter(item => {
        const matchesCategory = category === 'All' || category === item.category
        const matchesSearch = !searchQuery || searchQuery.length < 2 ||
            item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className='food-display' id='food-display'>
            <div className="food-display-header">
                <h2>
                    {category === 'All' ? 'Top dishes near you' : category}
                </h2>
                {!loading && (
                    <span className="results-count">
                        {filteredList.length} {filteredList.length === 1 ? 'dish' : 'dishes'} found
                    </span>
                )}
            </div>

            <div className="food-display-list">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    : filteredList.length === 0
                        ? (
                            <div className="no-results">
                                <div className="icon">🍽️</div>
                                <h3>No dishes found</h3>
                                <p>Try a different category or search term</p>
                            </div>
                        )
                        : filteredList.map((item, index) => (
                            <Fooditem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                category={item.category}
                                isNew={index < 3}
                                isPopular={index >= 3 && index < 7}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default FoodDisplay
