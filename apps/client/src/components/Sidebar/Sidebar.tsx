// External Dependencies
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Internal Dependencies
import style from './Sidebar.module.scss';
import ButtonWrapper from './ButtonWrapper/ButtonWrapper';
import Button from './Button/Button';
import { getUser } from '../../utils/api/user';
import { UserClass } from 'shared/src/classes';
import { UserRoleEnum } from 'shared/src/enums';

export default function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();
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
		<div className={style.sidebar}>
			<div className={style.contentWrapper}>
				<div className={style.logo}>
					<img
						src='/logo_light.svg'
						alt='ContinuumCI Logo'
					/>
					<h1>ContinuumCI</h1>
				</div>
				<ButtonWrapper text='ANALYTICS'>
					<>
						<Button
							text='Overview'
							icon='/icons/overview.svg'
							onClick={() => navigate('/')}
							selected={location.pathname === '/'}
						/>
					</>
				</ButtonWrapper>
				<ButtonWrapper text='DEPLOYMENTS'>
					<>
						<Button
							text='Applications'
							icon='/icons/applications.svg'
							onClick={() => console.log('Applications')}
						/>
						<Button
							text='Containers'
							icon='/icons/containers.svg'
							onClick={() => console.log('Containers')}
						/>
						<Button
							text='Domains'
							icon='/icons/nginx.svg'
							onClick={() => console.log('Domains')}
						/>
					</>
				</ButtonWrapper>
				<ButtonWrapper text='SETTINGS'>
					<>
						<Button
							text='General'
							icon='/icons/settings.svg'
							onClick={() => navigate('/settings')}
							selected={location.pathname === '/settings'}
						/>
						{user.role == UserRoleEnum.ROOT && (
							<Button
								text='Users'
								icon='/icons/users.svg'
								onClick={() => navigate('/settings/users')}
								selected={
									location.pathname === '/settings/users'
								}
							/>
						)}
						{(user.role == UserRoleEnum.ROOT ||
							user.role == UserRoleEnum.ADMIN) && (
							<>
								<Button
									text='Docker'
									icon='/icons/docker.svg'
									onClick={() => console.log('Docker')}
								/>
								<Button
									text='Nginx'
									icon='/icons/nginx.svg'
									onClick={() => navigate('/settings/nginx')}
									selected={
										location.pathname === '/settings/nginx'
									}
								/>
							</>
						)}
					</>
				</ButtonWrapper>
			</div>
			<div className={style.footer}>
				<p className={style.footerText}>
					Authenticated as: <span>{user.username}</span>
				</p>
				<Button
					text='Sign out'
					icon='/icons/signout.svg'
					onClick={() => console.log('Sign out')}
				/>
			</div>
		</div>
	);
}
