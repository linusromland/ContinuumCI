// External dependencies
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import RootLayout from '../components/Layouts/RootLayout/RootLayout';
import MainLayout from '../components/Layouts/MainLayout/MainLayout';
import SetupLayout from '../components/Layouts/SetupLayout/SetupLayout';

// Setup/Login Pages
import Login from './Login/Login';
import Setup from './Setup/Setup';
import Welcome from './Welcome/Welcome';

// Analytics Pages
import Overview from './Overview/Overview';

// Deployment Pages
import Applications from './Applications/Applications';

// Settings Pages
import GeneralSettings from './Settings/General/General';
import UserSettings from './Settings/Users/Users';
import NginxSettings from './Settings/Nginx/Nginx';

export default function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RootLayout />}>
					<Route element={<MainLayout />}>
						<Route
							path='/'
							element={<Overview />}
						/>
						<Route
							path='/applications'
							element={<Applications />}
						/>
						<Route>
							<Route
								path='/settings'
								element={<GeneralSettings />}
							/>
							<Route
								path='/settings/users'
								element={<UserSettings />}
							/>
							<Route
								path='/settings/nginx'
								element={<NginxSettings />}
							/>
						</Route>
					</Route>
					<Route element={<SetupLayout />}>
						<Route
							path='/welcome'
							element={<Welcome />}
						/>
						<Route
							path='/login'
							element={<Login />}
						/>
						<Route
							path='/setup'
							element={<Setup />}
						/>
					</Route>
					<Route
						path='*'
						element={<Navigate to='/' />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
