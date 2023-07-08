import { Link } from 'react-router-dom';
import img from '../../../assets/allProducts.jpg';

export const ProductCard = ({ name, stock, type, unit_price }) => {
	// If i want to use a stock images, i can use the next const
	// const productImgUrl = `/assets/product/${name}.jpg`

	return (
		<>
			<div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 animate__animated animate__fadeIn">
				<div className="card h-100">
					<div className="card-img-container">
						<img src={img} alt={name} className="card-img img-fluid" />
					</div>
					<div className="card-body d-flex flex-column">
						<h5 className="card-title">{name}</h5>
						<p className="card-text">Product type: {type}</p>
						<p className="card-text">
							<small className="text-muted">$ {unit_price}</small>
						</p>
						<p className="card-text">
							Stock <small className="text-muted">{stock}</small>
						</p>
						<div className="mt-auto">
							<Link to={`/product/${name}`}>More...</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
