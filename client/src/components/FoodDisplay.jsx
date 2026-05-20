import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Fooditem from '../Fooditem'

const FoodDisplay = ({ category }) => {
    const { food_list, loading, searchQuery } = useContext(StoreContext)
    const filteredList = food_list.filter(item => {
        
    })
    return (

    )
}

export default FoodDisplay