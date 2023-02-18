// External dependencies
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Routes imports
import Home from './Home/Home';
import Layout from './Layout/Layout';
import Welcome from './Welcome/Welcome';

export default function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Layout />}
				>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/welcome'
						element={<Welcome />}
					/>
					<Route
						path='*'
						element={<Navigate to='/' />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
