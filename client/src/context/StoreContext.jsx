import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const [cartItem, setCartItem] = useState({});
    const [wishlist, setWishlist] = useState(new Set());
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toasts, setToasts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [userProfile, setUserProfile] = useState(null);

    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    

}
export default StoreContextProvider;