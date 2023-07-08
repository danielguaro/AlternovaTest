import { CartContext } from './CartContext';
import { products } from '../shop/data/products.json';
import { useState } from 'react';

export const CartProvider = ({ children }) => {
	const [allProducts, setAllProducts] = useState(products);
	return (
		<>
			<CartContext.Provider value={(allProducts, setAllProducts)}>
				{children}
			</CartContext.Provider>
		</>
	);
};
