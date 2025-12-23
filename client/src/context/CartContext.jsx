import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0); // Giữ số lượng giỏ hàng

    const updatedCartCount = (newCount) => {
        setCartCount(newCount); // Cập nhật số lượng giỏ hàng
    };

    return (
        <CartContext.Provider value={{ cartCount, updatedCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
