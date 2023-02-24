// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

// Internal dependencies
import './main.scss';
import Router from './routes';

// Toast CSS
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ToastContainer
			position='top-left'
			autoClose={5000}
			hideProgressBar={false}
			pauseOnFocusLoss={false}
			pauseOnHover={false}
			closeOnClick
		/>
		<Router />
	</React.StrictMode>
);
