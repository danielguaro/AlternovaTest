// export const getProductByType = async (type) => {
// 	// const validType = ['technology', 'sport', 'building'];

// 	const response = await fetch('../data/products.json');
// 	console.log(response);
// 	// if (!response.ok) {
// 	// 	throw new Error('Error al cargar el archivo JSON');
// 	// }
// 	// if (validType.includes(type)) {
// 	// 	throw new Error(`${type} is not a valid product`);
// 	// }
// 	const data = await response.json();
// 	// Aquí puedes trabajar con los datos JSON obtenidos
// 	console.log(data);
// 	return data.filter((product) => product.type === type);
// };

// import productsData from '../data/products.json';

import { products } from '../data/products.json';

export const getProductByType = (type) => {
	// console.log(products);
	const validType = ['technology', 'sport', 'building'];
	// console.log(type);
	if (!validType.includes(type)) {
		throw new Error(`${type} is not a valid product`);
	}
	const filteredProducts = products.filter((product) => product.type === type);
	return filteredProducts;
};
export const getAllProducts = () => {
	return products;
};
