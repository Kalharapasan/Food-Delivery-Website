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

    const addToast = useCallback((message, type = "info") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const contextValue = {
        food_list,
        cartItem,
        wishlist,
        addToCart,
        removeFromCart,
        clearCartItem,
        getTotalCartAmount,
        getTotalCartCount,
        toggleWishlist,
        url,
        token,
        setToken,
        login,
        register,
        logout,
        loading,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        searchResults,
        userProfile,
        setUserProfile,
    };
    
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}
export default StoreContextProvider;