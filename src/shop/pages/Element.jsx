import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getProductByName } from '../helpers';
import { useMemo } from 'react';
import { useCounter } from '../hooks/useCounter';
import { Cart } from './Cart';

// import img from '../../../assets/allProducts.jpg';

export const Element = () => {
	const { nameId } = useParams();
	const navigate = useNavigate();

	const product = useMemo(() => getProductByName(nameId), [nameId]);
	console.log(product);
	const onNavigateBack = () => {
		navigate(-1);
	};
	console.log(product.stock);
	const { counter, increment, decrement, reset } = useCounter(1, product.stock);

	const onNavigateBuy = () => {
		navigate('/cart');
	};

	if (!product) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<div className="row mt-5">
				<div className="col-12 col-md-4 text-center">
					<img
						// src={`/assets/products/${nameid}.jpg`}
						src={'../../../assets/allProducts.jpg'}
						alt={product.name}
						className="img-thumbnail animate__animated animate__fadeInLeft img-fluid"
					/>
				</div>
				<div className="col-12 col-md-8">
					<h3>{product.name}</h3>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<b>Type:</b> {product.type}
						</li>
						<li className="list-group-item">
							<b>Stock:</b> {product.stock}
						</li>
						<li className="list-group-item">
							<b>Description:</b> Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Harum, laboriosam placeat?
						</li>
					</ul>
					<h5 className="mt-3">Want to buy it?</h5>
					<h6 className="card-text">
						Amount <strong className="text-muted">{counter}</strong>
					</h6>
					<div className="d-flex justify-content-end align-items-center mt-4">
						<button
							className="btn btn-outline-primary me-2"
							onClick={() => increment(1)}
						>
							+1
						</button>
						<button className="btn btn-light me-2" onClick={reset}>
							Reset
						</button>
						<button
							className="btn btn-outline-danger me-2"
							onClick={() => decrement(1)}
						>
							-1
						</button>
						{/* <button className="btn btn-success me-2">-1</button>
						<button className="btn btn-secondary me-2">-1</button> */}
					</div>
					<hr />
					<div className="d-flex justify-content-end align-items-center">
						<button
							className="btn btn-outline-primary me-4 animate__animated animate__pulse"
							onClick={onNavigateBuy}
						>
							buy
						</button>
						<button className="btn btn-outline-danger" onClick={onNavigateBack}>
							Back
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
