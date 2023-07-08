import { useEffect, useState } from 'react';

import { CartContext } from './CartContext';
import { products } from '../shop/data/products.json';

export const CartProvider = ({ children }) => {
	// de clase de CoderHose
	const [cartProducts, setCartProducts] = useState(() => {
		try {
			const storedCartProducts = localStorage.getItem('cartProducts');
			return storedCartProducts ? JSON.parse(storedCartProducts) : [];
		} catch {
			return [];
		}
	});
	useEffect(() => {
		try {
			localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
		} catch (error) {
			console.error('Error storing cart products in localStorage:', error);
		}
	}, [cartProducts]);
	const [boughtProducts, setBoughtProducts] = useState([]);

	const canBeAdd = (amount, item) => {
		const availableStock = item.stock - getAmountInCart(item.name);
		return amount <= availableStock;
	};

	const getAmountInCart = (name) => {
		return cartProducts.reduce((acc, product) => {
			return product.name === name ? acc + product.amount : acc;
		}, 0);
	};

	const addToCart = (item) => {
		const alreadyOnCart = cartProducts.find(
			(product) => product.name === item.name
		);

		if (alreadyOnCart) {
			setCartProducts((prevProductsInIt) =>
				prevProductsInIt.map((product) =>
					product.name === item.name
						? { ...product, amount: product.amount + item.amount }
						: product
				)
			);
		} else {
			setCartProducts([...cartProducts, item]);
		}
	};

	const deleteElement = (nameId, products = []) => {
		const updateProducts = products.filter(
			(product) => product.name !== nameId
		);
		setCartProducts(updateProducts);
	};

	const deleteAll = () => {
		setCartProducts([]);
	};

	const buyProducts = (items) => {
		setBoughtProducts(items);
	};

	return (
		<>
			<CartContext.Provider
				value={{
					cartProducts,
					// Methods
					canBeAdd,
					getAmountInCart,
					addToCart,
					deleteElement,
					deleteAll,
					buyProducts,
				}}
			>
				{children}
			</CartContext.Provider>
		</>
	);
};
