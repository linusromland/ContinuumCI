// Internal Dependencies
import style from './Sidebar.module.scss';
import ButtonWrapper from './ButtonWrapper/ButtonWrapper';
import Button from './Button/Button';

export default function Sidebar() {
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
							onClick={() => console.log('Overview')}
						/>
						<Button
							text='Logs'
							icon='/icons/logs.svg'
							onClick={() => console.log('Logs')}
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
							onClick={() => console.log('General')}
						/>
						<Button
							text='Users'
							icon='/icons/users.svg'
							onClick={() => console.log('Users')}
						/>
						<Button
							text='Docker'
							icon='/icons/docker.svg'
							onClick={() => console.log('Docker')}
						/>
						<Button
							text='Nginx'
							icon='/icons/nginx.svg'
							onClick={() => console.log('Nginx')}
						/>
					</>
				</ButtonWrapper>
			</div>
			<div className={style.footer}>
				<p>
					Authenticated as: <span>Linus</span>
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
