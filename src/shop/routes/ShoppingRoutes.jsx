import {
	AlternovaPage,
	Building,
	Cart,
	Element,
	Search,
	Sport,
	Technology,
} from '../pages';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../ui';

export const ShoppingRoutes = () => {
	return (
		<>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<AlternovaPage />} />
					<Route path="/technology" element={<Technology />} />
					<Route path="/sport" element={<Sport />} />
					<Route path="/building" element={<Building />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/search" element={<Search />} />
					<Route path="/product/:nameId" element={<Element />} />
					<Route path="/" element={<Navigate to="/technology" />} />
				</Routes>
			</div>
		</>
	);
};
