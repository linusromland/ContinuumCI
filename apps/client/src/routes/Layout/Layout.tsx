// External Dependencies
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// Internal Dependencies
import { getSetup } from '../../utils/api/setup';
import { getUser } from '../../utils/api/user';
import setToken from '../../utils/setToken';

export default function Layout(): JSX.Element {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		(async () => {
			const setup = await getSetup();
			if (setup && setup.status == 'incomplete') navigate('/welcome');

			const token = localStorage.getItem('token');

			if (token)
				setToken({
					token: token
				});

			const authenticated = await getUser();
			if (!authenticated) navigate('/login');

			setLoading(false);
		})();
	}, []);

	if (loading) return <h1>Loading...</h1>;

	return <Outlet />;
}
