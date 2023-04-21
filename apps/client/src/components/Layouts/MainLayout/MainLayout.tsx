// External Dependencies
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// Internal Dependencies
import style from './MainLayout.module.scss';
import Sidebar from '../../Sidebar/Sidebar';
import { getUser } from '../../../utils/api/user';
import { UserClass } from 'shared/src/classes';
import UnverifiedBanner from '../../UnverifiedBanner/UnverifiedBanner';

export default function MainLayout(): JSX.Element {
	const [user, setUser] = useState({} as UserClass);

	useEffect(() => {
		(async () => {
			const userResponse = await getUser();
			const user = userResponse.data as UserClass;

			if (user) {
				setUser(user);
			}
		})();
	}, []);

	return (
		<div className={style.mainLayoutWrapper}>
			{user.verifiedEmail === false && <UnverifiedBanner />}
			<div className={style.mainLayout}>
				<Sidebar user={user} />
				<Outlet />
			</div>
		</div>
	);
}
