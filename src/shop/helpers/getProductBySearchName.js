import { products } from '../data/products.json';
export const getProductBySearchName = (searchName = '') => {
	const name = searchName.toLocaleLowerCase().trim();
	if (name.length === 0) return [];

	return products.filter((product) =>
		product.name.toLocaleLowerCase().includes(name)
	);
};
