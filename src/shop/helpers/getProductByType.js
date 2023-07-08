import { products } from '../data/products.json';

export const getProductByType = (type) => {
	const validType = ['technology', 'sport', 'building'];
	if (!validType.includes(type)) {
		throw new Error(`${type} is not a valid product`);
	}
	const filteredProducts = products.filter((product) => product.type === type);
	return filteredProducts;
};
export const getAllProducts = () => {
	return products;
};
