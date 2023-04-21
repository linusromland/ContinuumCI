// External Dependencies
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// Internal Dependencies
import style from './Sidebar.module.scss';
import ButtonWrapper from './ButtonWrapper/ButtonWrapper';
import Button from './Button/Button';
import api from '../../utils/api';
import { UserClass } from 'shared/src/classes';
import { UserRoleEnum } from 'shared/src/enums';
import { toast } from 'react-toastify';

interface SidebarProps {
	user: UserClass;
}

export default function Sidebar({ user }: SidebarProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	return (
		<div className={clsx(style.sidebar, open ? style.openSidebar : style.closedSidebar)}>
			<div className={style.header}>
				<div className={style.logo}>
					<img
						src='/logo_light.svg'
						alt='ContinuumCI Logo'
					/>
					<h1>ContinuumCI</h1>
				</div>
				<button
					className={style.toggleSidebar}
					onClick={() => setOpen(!open)}
				>
					<img
						src={open ? '/icons/close_white.svg' : '/icons/menu.svg'}
						alt='Toggle sidebar'
					/>
				</button>
			</div>
			<div className={clsx(style.content, open ? style.open : style.closed)}>
				<div className={style.buttons}>
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
								text='Projects'
								icon='/icons/projects.svg'
								onClick={() => navigate('/projects')}
								selected={location.pathname.includes('projects')}
							/>
							<Button
								text='Containers'
								icon='/icons/containers.svg'
								onClick={() => navigate('/containers')}
								selected={location.pathname === '/containers'}
							/>
							<Button
								text='Domains'
								icon='/icons/nginx.svg'
								onClick={() => navigate('/domains')}
								selected={location.pathname === '/domains'}
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
									selected={location.pathname === '/settings/users'}
								/>
							)}
							{(user.role == UserRoleEnum.ROOT || user.role == UserRoleEnum.ADMIN) && (
								<Button
									text='Nginx'
									icon='/icons/nginx.svg'
									onClick={() => navigate('/settings/nginx')}
									selected={location.pathname === '/settings/nginx'}
								/>
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
						onClick={() => {
							try {
								if (!localStorage || !sessionStorage) return;
								localStorage.removeItem('token');
								sessionStorage.removeItem('token');
								api.defaults.headers.common['Authorization'] = '';
								toast.success('Successfully signed out', {
									position: 'top-left'
								});
								navigate('/login');
							} catch (error) {
								console.log(error);
								toast.error('Failed to sign out');
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}
