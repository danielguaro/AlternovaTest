import { ProductCard } from './';
import { getProductByType } from '../helpers';
import { useMemo } from 'react';

export const ProductList = ({ type }) => {
	const product = useMemo(() => getProductByType(type), [type]);
	return (
		<>
			<div className="row rows-cols-1 row-cols-md-3 g-3">
				{product.map((element) => (
					<ProductCard key={element.name} {...element} />
				))}
			</div>
		</>
	);
};
