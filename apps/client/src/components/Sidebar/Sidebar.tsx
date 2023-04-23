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
import useTranslations, { translations } from '../../i18n/translations';
import i18n from '../../i18n/i18n';

interface SidebarProps {
	user: UserClass;
}

export default function Sidebar({ user }: SidebarProps) {
	const t = useTranslations();
	const location = useLocation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	async function changeLocation(path: string) {
		navigate(path);
		setOpen(false);
	}

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
					<ButtonWrapper text={t.sidebar.analytics.title}>
						<>
							<Button
								text={t.sidebar.analytics.overview}
								icon='/icons/overview.svg'
								onClick={() => changeLocation('/')}
								selected={location.pathname === '/'}
							/>
						</>
					</ButtonWrapper>
					<ButtonWrapper text={t.sidebar.deployments.title}>
						<>
							<Button
								text={t.sidebar.deployments.projects}
								icon='/icons/projects.svg'
								onClick={() => changeLocation('/projects')}
								selected={location.pathname.includes('projects')}
							/>
							<Button
								text={t.sidebar.deployments.containers}
								icon='/icons/containers.svg'
								onClick={() => changeLocation('/containers')}
								selected={location.pathname === '/containers'}
							/>
							<Button
								text={t.sidebar.deployments.domains}
								icon='/icons/nginx.svg'
								onClick={() => changeLocation('/domains')}
								selected={location.pathname === '/domains'}
							/>
						</>
					</ButtonWrapper>
					<ButtonWrapper text={t.sidebar.settings.title}>
						<>
							<Button
								text={t.sidebar.settings.general}
								icon='/icons/settings.svg'
								onClick={() => changeLocation('/settings')}
								selected={location.pathname === '/settings'}
							/>
							{user.role == UserRoleEnum.ROOT && (
								<Button
									text={t.sidebar.settings.users}
									icon='/icons/users.svg'
									onClick={() => changeLocation('/settings/users')}
									selected={location.pathname === '/settings/users'}
								/>
							)}
							{(user.role == UserRoleEnum.ROOT || user.role == UserRoleEnum.ADMIN) && (
								<Button
									text='Nginx'
									icon='/icons/nginx.svg'
									onClick={() => changeLocation('/settings/nginx')}
									selected={location.pathname === '/settings/nginx'}
								/>
							)}
						</>
					</ButtonWrapper>
				</div>
				<div className={style.footer}>
					<ButtonWrapper>
						<>
							<p className={style.footerText}>
								{t.sidebar.footer.authenticatedAs}: <span>{user.username}</span>
							</p>
							<Button
								text={t.lang}
								icon='/icons/globe.svg'
								onClick={() => {
									const languages = Object.keys(translations);
									const index = languages.indexOf(i18n.language);
									i18n.changeLanguage(languages[languages.length == index + 1 ? 0 : index + 1]);
								}}
							/>

							<Button
								text={t.sidebar.footer.signOut}
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
										changeLocation('/login');
									} catch (error) {
										console.log(error);
										toast.error('Failed to sign out');
									}
								}}
							/>
						</>
					</ButtonWrapper>
				</div>
			</div>
		</div>
	);
}
