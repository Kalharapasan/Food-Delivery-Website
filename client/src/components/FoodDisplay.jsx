import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Fooditem from '../Fooditem'

const FoodDisplay = ({ category }) => {
    const { food_list, loading, searchQuery } = useContext(StoreContext)
    return (

    )
}

export default FoodDisplay