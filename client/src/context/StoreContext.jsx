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

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.foods || response.data.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch food list:", error);
            addToast("Failed to load menu. Please refresh.", "error");
        }
    };

    const loadCartData = async (tok) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token: tok } }
            );
            if (response.data.success) {
                setCartItem(response.data.cartData || {});
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    };

    const addToCart = async (itemId) => {
        const item = food_list.find(f => f._id === itemId);
        setCartItem(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        addToast(`${item?.name || "Item"} added to cart 🛒`, "success");
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Failed to sync cart add:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItem(prev => {
            const count = prev[itemId] || 0;
            const next = { ...prev, [itemId]: count > 1 ? count - 1 : 0 };
            if (next[itemId] === 0) delete next[itemId];
            return next;
        });
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Failed to sync cart remove:", error);
            }
        }
    };

    const clearCartItem = async (itemId) => {
        setCartItem(prev => {
            const next = { ...prev };
            delete next[itemId];
            return next;
        });
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId, removeAll: true },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Failed to sync cart clear:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const [id, qty] of Object.entries(cartItem)) {
            if (qty > 0) {
                const product = food_list.find(p => p._id === id);
                if (product) total += product.price * qty;
            }
        }
        return total;
    };

    const getTotalCartCount = () => {
        return Object.values(cartItem).reduce((sum, qty) => sum + qty, 0);
    };

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