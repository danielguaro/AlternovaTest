import { ProductCard } from './ProductCard';
import { getAllProducts } from '../helpers';

export const AllProductsList = () => {
	const allProducts = getAllProducts();

	return (
		<>
			<div className="row rows-cols-1 row-cols-md-3 g-3">
				{allProducts.map((element) => (
					<ProductCard key={element.name} {...element} />
				))}
			</div>
		</>
	);
};
