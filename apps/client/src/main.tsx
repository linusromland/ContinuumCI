// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';

// Internal dependencies
import './main.scss';
import Router from './routes';
import i18n from './i18n/i18n';

// Toast CSS
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<ToastContainer
				autoClose={5000}
				hideProgressBar={false}
				pauseOnFocusLoss={false}
				pauseOnHover={false}
				closeOnClick
			/>
			<Router />
		</I18nextProvider>
	</React.StrictMode>
);
