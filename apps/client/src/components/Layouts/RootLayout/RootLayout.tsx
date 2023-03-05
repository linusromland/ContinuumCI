// External Dependencies
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { SetupType } from 'shared/src/types';

// Internal Dependencies
import { getSetup } from '../../../utils/api/setup';
import { getUser } from '../../../utils/api/user';
import setToken from '../../../utils/setToken';

export default function RootLayout(): JSX.Element {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		(async () => {
			const setup = await getSetup();
			const result = setup.data as SetupType;

			if (result && result.status == 'incomplete') {
				navigate('/welcome');
				return setLoading(false);
			}

			const token = localStorage.getItem('token');

			if (token)
				await setToken({
					token: token
				});
			else {
				const sessionToken = sessionStorage.getItem('token');
				if (sessionToken)
					await setToken({
						token: sessionToken
					});
			}

			const response = await getUser();
			if (!response.success) navigate('/login');

			setLoading(false);
		})();
	}, []);

	if (loading) return <h1>Loading...</h1>;

	return <Outlet />;
}
