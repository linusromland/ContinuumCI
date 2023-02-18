// External Dependencies
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// Internal Dependencies
import { getSetup } from '../../utils/api/setup';

export default function Layout(): JSX.Element {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		(async () => {
			const setup = await getSetup();
			if (setup && setup.status == 'incomplete') navigate('/setup');
			setLoading(false);
		})();
	}, []);

	if (loading) return <h1>Loading...</h1>;

	return <Outlet />;
}
