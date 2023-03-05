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
					<p>Deployments</p>
				</ButtonWrapper>
				<ButtonWrapper text='SETTINGS'>
					<p>Deployments</p>
				</ButtonWrapper>
			</div>
		</div>
	);
}
