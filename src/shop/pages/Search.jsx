import { useLocation, useNavigate } from 'react-router-dom';

import { ProductCard } from '../components/ProductCard';
import { getProductBySearchName } from '../helpers';
import queryString from 'query-string';
import { useForm } from '../hooks/useForm';

export const Search = () => {
	const navigate = useNavigate();
	// To see the location
	const location = useLocation();
	// console.log(location);
	// To avoid hardWork with location, import queryString
	const { q = '' } = queryString.parse(location.search);
	// console.log(q);

	const products = getProductBySearchName(q);

	const { searchText, onInputChange } = useForm({
		searchText: q,
	});

	const onSearchSubmit = (e) => {
		e.preventDefault();
		if (searchText.trim().length === 0) {
			navigate('/search');
		}
		if (searchText.trim().length <= 2) return;
		// console.log(searchText);
		navigate(`?q=${searchText.toLowerCase().trim()}`);
	};

	const showSearch = q.length === 0;
	const showError = q.length > 0 && products.length === 0;

	return (
		<>
			{/* <h1>Search</h1>
			<hr /> */}
			<div className="row mt-4">
				<div className="col-5">
					<h4>searching</h4>
					<hr />
					<form
						onSubmit={onSearchSubmit} // Valor muy importante
					>
						<input
							type="text"
							placeholder="search Product"
							className="form-control"
							autoComplete="off"
							name="searchText" // Valor muy relevante
							value={searchText} // Valor muy relevante
							onChange={onInputChange} // Valor muy relevante
						/>
						<button className="btn btn-outline-primary mt-1">Search</button>
					</form>
				</div>
				<div className="col-12">
					<h4 className="mt-2">
						{products.length > 0 && (
							<>
								Results{' '}
								<strong className="text-primary">{products.length}</strong>
							</>
						)}
					</h4>
					<hr />
					<div
						className="alert alert-primary animate__animated animate__fadeIn"
						style={{ display: showSearch ? '' : 'none' }}
					>
						search product
					</div>
					<div
						className="alert alert-danger animate__animated animate__fadeIn"
						style={{ display: showError ? '' : 'none' }}
					>
						No product with <b>{q}</b> name
					</div>
					<div className="d-flex flex-wrap justify-content-around">
						{products.map((product) => (
							<ProductCard key={product.name} {...product} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};
