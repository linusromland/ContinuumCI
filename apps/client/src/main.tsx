// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// Internal dependencies
import './main.scss';
import Router from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
