import 'sweetalert2/dist/sweetalert2.css';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../auth/context/AuthContext';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';

export const Cart = () => {
	const { cartProducts, deleteElement, deleteAll } = useContext(CartContext);
	const { user } = useContext(AuthContext);
	const person = user.name;
	const [allCost, setAllCost] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		const total = cartProducts.reduce(
			(acc, product) => acc + product.unit_price * product.amount,
			0
		);
		setAllCost(total);
	}, [cartProducts]);

	const totalAmount = cartProducts.reduce(
		(acc, product) => acc + product.amount,
		0
	);

	const onDeleteItem = (nameId) => {
		deleteElement(nameId, cartProducts);
	};

	const onDeleteAll = () => {
		deleteAll();
	};

	const onHome = () => {
		navigate('/');
	};

	const onBuy = () => {
		const data = {
			user: person,
			products: cartProducts.map((product) => ({
				name: product.name,
				amount: product.amount,
				unit_price: product.unit_price,
				total_price: product.amount * product.unit_price,
			})),
			total_cost: allCost,
		};

		const jsonData = JSON.stringify(data, null, 2);
		// null --> not put any transformation in the values

		const element = document.createElement('a'); // element that will help to download the file
		const file = new Blob([jsonData], { type: 'application/json' });
		element.href = URL.createObjectURL(file); // To create the URL object
		element.download = 'purchase.json'; // download is an attribute from the element a
		element.setAttribute('download', 'purchase.json'); // to be sure that the file will be downloaded
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);

		// implementing SweetAlert
		const PurchaseDetails = `
    <div>
      <h4>Purchase Details:</h4>
      <p><strong>User:</strong> ${data.user}</p>
      <h5>Products:</h5>
      <ul>
        ${data.products
					.map(
						(product) =>
							`<li>
              <strong>Name:</strong> ${product.name}<br>
              <strong>Amount:</strong> ${product.amount}<br>
              <strong>Unit Price:</strong> $${product.unit_price}<br>
              <strong>Total Price:</strong> $${product.total_price}
            </li>`
					)
					.join('')}
      </ul>
			<p><strong>Total Cost:</strong> $${data.total_cost}</p>
			<h2>Thanks for buying with us!</h2>
    </div>
  `;

		Swal.fire({
			icon: 'success',
			title: 'Purchase Successful',
			html: PurchaseDetails,
			showConfirmButton: true,
			preConfirm: onHome,
		});

		deleteAll();
	};

	if (cartProducts.length === 0) {
		return (
			<>
				<h1 className="card-title text-danger mt-4">
					There is no products yet <Link to={'/'}>Go home...</Link>
				</h1>
			</>
		);
	}

	return (
		<>
			<div className="container mt-5">
				<h4>Cart</h4>
				<hr />
				<div className="card animate__animated animate__fadeIn">
					<div className="list-group list-group-flush">
						{cartProducts.map((product) => (
							<div key={product.name} className="list-group-item">
								<div className="row g-0">
									<div className="col-4 col-sm-3 col-md-2">
										<img
											src={'../../../assets/allProducts.jpg'}
											alt={product.name}
											className="img-thumbnail img-fluid"
											style={{ maxWidth: '100%', height: 'auto' }}
										/>
									</div>
									<div className="col-8 col-sm-9 col-md-10">
										<div>
											<h3 className="card-title">{product.name}</h3>
											<p className="card-text">Type: {product.type}</p>
											<p className="card-text">Amount: {product.amount}</p>
											<p className="card-text">Price: ${product.unit_price}</p>
										</div>
										<div>
											<h6 className="card-text mt-2 mb-2">
												Total:
												<strong className="text-primary">
													${product.amount * product.unit_price}
												</strong>
											</h6>
										</div>
										<div className="d-flex justify-content-end">
											<button
												className="btn btn-outline-danger"
												onClick={() => onDeleteItem(product.name)}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3">
						<div className="d-flex mb-3 mb-sm-0">
							<h3 className="card-text mb-0 ">
								Total Items :{' '}
								<strong className="text-primary">{totalAmount}</strong>
							</h3>
							<h3 className="card-text mb-0  ms-4">
								Total Value:{' '}
								<strong className="text-primary">${allCost}</strong>
							</h3>
						</div>
						<div className="d-flex gap-2">
							<button
								className="btn btn-outline-success flex-grow-1 animate__animated animate__pulse"
								onClick={onBuy}
							>
								Buy
							</button>
							<button
								className="btn btn-outline-danger flex-grow-1"
								onClick={onDeleteAll}
							>
								Delete All
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
