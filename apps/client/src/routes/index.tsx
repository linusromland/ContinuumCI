// External dependencies
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Routes imports
import Home from './Home/Home';
import About from './About/About';

export default function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='*'
					element={<Navigate to='/' />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
