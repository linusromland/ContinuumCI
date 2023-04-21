// External Dependencies
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// Internal Dependencies
import style from './MainLayout.module.scss';
import Sidebar from '../../Sidebar/Sidebar';
import { getUser } from '../../../utils/api/user';
import { UserClass } from 'shared/src/classes';
import UnverifiedBanner from '../../UnverifiedBanner/UnverifiedBanner';
import { toast } from 'react-toastify';

export default function MainLayout(): JSX.Element {
	const [user, setUser] = useState({} as UserClass);

	useEffect(() => {
		getUserData();
	}, []);

	async function getUserData() {
		const userResponse = await getUser();
		const user = userResponse.data as UserClass;

		if (user) {
			setUser(user);

			return user;
		}

		return null;
	}

	return (
		<div className={style.mainLayoutWrapper}>
			{user.verifiedEmail === false && (
				<UnverifiedBanner
					recheckStatus={async () => {
						const user = await getUserData();
						if (user?.verifiedEmail) {
							toast.success('Your email has been verified!');
						}
					}}
				/>
			)}
			<div className={style.mainLayout}>
				<Sidebar user={user} />
				<Outlet />
			</div>
		</div>
	);
}
