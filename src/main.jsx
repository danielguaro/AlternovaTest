import './index.css';

import { AlternovaApp } from './AlternovaApp.jsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AlternovaApp />
		</BrowserRouter>
	</React.StrictMode>
);
