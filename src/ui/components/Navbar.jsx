import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const onLogout = () => {
		logout();
		navigate('/login', {
			replace: true,
		});
	};

	const closeNavbar = () => {
		setIsNavCollapsed(true);
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
				<Link className="navbar-brand" to="/" onClick={closeNavbar}>
					Alternova
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded={!isNavCollapsed}
					aria-label="Toggle navigation"
					onClick={() => setIsNavCollapsed(!isNavCollapsed)}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}
					id="navbarNav"
				>
					<div className="navbar-nav">
						<NavLink
							className={({ isActive }) =>
								` nav-item nav-link ${isActive ? 'active' : ''}`
							}
							to="/technology"
							onClick={closeNavbar}
						>
							technology
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								` nav-item nav-link ${isActive ? 'active' : ''}`
							}
							to="/sport"
							onClick={closeNavbar}
						>
							Sport
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								` nav-item nav-link ${isActive ? 'active' : ''}`
							}
							to="/building"
							onClick={closeNavbar}
						>
							Building
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								`nav-item nav-link ${isActive ? 'active' : ''}`
							}
							to="/search"
							onClick={closeNavbar}
						>
							Search
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								`nav-item nav-link ${isActive ? 'active' : ''}`
							}
							to="/cart"
							onClick={closeNavbar}
						>
							Cart
						</NavLink>
					</div>
					<div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
						<ul className="navbar-nav ml-auto">
							<span className="nav-item nav-link text-primary">
								{user?.name}
							</span>
							<button
								className="nav-item nav-link btn p-1 text-danger"
								onClick={onLogout}
							>
								Logout
							</button>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
