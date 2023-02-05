// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// Internal dependencies
import Router from './routes';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
