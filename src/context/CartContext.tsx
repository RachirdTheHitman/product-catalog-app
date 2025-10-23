import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/product';

interface CartContextType {
    items: CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const value: CartContextType = {
        items,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
