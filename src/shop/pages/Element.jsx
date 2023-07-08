import 'sweetalert2/dist/sweetalert2.css';

import { Navigate, useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import { getProductByName } from '../helpers';
import { useCartContext } from '../../context/CartContext';
import { useCounter } from '../hooks/useCounter';
import { useMemo } from 'react';

// import img from '../../../assets/allProducts.jpg';

export const Element = () => {
	const { cartProducts, addToCart, canBeAdd, getAmountInCart } =
		useCartContext();
	const { nameId } = useParams();
	const navigate = useNavigate();

	const product = useMemo(() => getProductByName(nameId), [nameId]);
	const onNavigateBack = () => {
		navigate(-1);
	};
	console.log(product.stock);
	const { counter, increment, decrement, reset } = useCounter(1, product.stock);

	const onHome = () => {
		navigate('/');
	};

	const onCheckBeforeAdd = (amount = counter) => {
		const currentAmountInCart = getAmountInCart(product.name);
		if (product.stock === 0) {
			Swal.fire({
				icon: 'error',
				title: `There is no stock at the moment`,
				showConfirmButton: true,
				timer: 1500,
			});
		} else if (currentAmountInCart + amount >= product.stock) {
			Swal.fire({
				icon: 'error',
				title: `You have already reached the maximum quantity available in the cart`,
				showConfirmButton: true,
			});
		} else {
			increment(1);
		}
	};

	const onAdd = (amount = counter) => {
		if (canBeAdd(amount, product)) {
			if (product.stock >= amount) {
				addToCart({ ...product, amount: amount });
				Swal.fire({
					icon: 'success',
					title: `${product.name} added`,
					showConfirmButton: true,
					confirmButtonText: 'Go home',
					preConfirm: onHome,
					footer: '<a href="/cart">Go to the cart?</a>',
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: `You have already all the available items in the cart`,
					showConfirmButton: true,
					timer: 1500,
				});
			}
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'it looks like we don´t have enough stock ',
			});
		}
	};
	console.log(cartProducts);

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
							onClick={() => onCheckBeforeAdd()}
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
					</div>
					<hr />
					<div className="d-flex justify-content-end align-items-center">
						<button
							className="btn btn-outline-primary me-4 animate__animated animate__pulse"
							onClick={() => onAdd(counter)}
						>
							Add to Cart
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
