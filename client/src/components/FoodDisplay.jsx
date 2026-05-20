import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Fooditem from '../Fooditem'

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

    )
}

export default FoodDisplay