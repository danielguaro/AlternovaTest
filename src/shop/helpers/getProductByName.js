import { products } from '../data/products.json';

export const getProductByName = (nameId) => {
	return products.find((product) => product.name === nameId);
};
