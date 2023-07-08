import { AuthProvider } from './auth';
import { CartProvider } from './context';
import { AppRouter } from './router/AppRouter';

export const AlternovaApp = () => {
	return (
		<AuthProvider>
			<CartProvider>
				<AppRouter />
			</CartProvider>
		</AuthProvider>
	);
};
