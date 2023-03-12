// External dependencies
import clsx from 'clsx';
import Select from 'react-select';

// Internal dependencies
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../../components/Button/Button';
import Widget from '../../../components/Widget/Widget';
import style from './Nginx.module.scss';

export default function Nginx(): JSX.Element {
	const customStyles = {
		control: (provided: object) => ({
			...provided,
			border: '2px solid #dadada',
			borderRadius: '0.25rem',
			fontSize: '0.8rem',
			fontWeight: 700,
			margin: '0'
		}),
		valueContainer: (provided: object) => ({
			...provided,
			padding: '0rem'
		})
	};

	return (
		<div className={style.main}>
			<Breadcrumbs path={[{ name: 'Settings' }, { name: 'Nginx' }]} />

			<h1 className={style.title}>Nginx Settings</h1>
			<Widget>
				<div className={style.container}>
					<h2 className={style.subtitle}>Configuration</h2>

					<div className={style.infoContainer}>
						<h3
							className={clsx(
								style.infoContainerTitle,
								style.row1,
								style.col1
							)}
						>
							Sites Enabled Directory:
						</h3>
						<p
							className={clsx(
								style.infoContainerValue,
								style.row1,
								style.col2
							)}
						>
							/etc/nginx/sites-enabled
						</p>
						<h3
							className={clsx(
								style.infoContainerTitle,
								style.row2,
								style.col1
							)}
						>
							Access Log Location:
						</h3>
						<p
							className={clsx(
								style.infoContainerValue,
								style.row2,
								style.col2
							)}
						>
							/var/log/nginx/custom.log
						</p>
						<h3
							className={clsx(
								style.infoContainerTitle,
								style.row3,
								style.col1
							)}
						>
							Local IP-Adresses:
						</h3>
						<p
							className={clsx(
								style.infoContainerValue,
								style.row3,
								style.col2
							)}
						>
							192.168.1.0/24
						</p>
					</div>
				</div>
			</Widget>
			<Widget>
				<div className={style.container}>
					<h2 className={style.subtitle}>Domain names</h2>

					{/* List of all avaible domain names, button to remove a domain name & input to add a new domain name */}
					<div className={style.infoContainer}>
						<h3
							className={clsx(
								style.infoContainerTitle,
								style.row1,
								style.col1
							)}
						>
							Available domain names:
						</h3>
						<p
							className={clsx(
								style.infoContainerValue,
								style.row1,
								style.col2
							)}
						>
							linusromland.com
						</p>
						<p
							className={clsx(
								style.infoContainerValue,
								style.row2,
								style.col2
							)}
						>
							linusromland.se
						</p>
					</div>
					<div className={clsx(style.infoContainer, style.actions)}>
						<h3
							className={clsx(
								style.infoContainerTitle,
								style.row1,
								style.col1
							)}
						>
							Add domain name:
						</h3>
						<input
							className={clsx(
								style.input,
								style.row1,
								style.col2
							)}
							type='text'
							placeholder='example.com'
						/>

						<Button
							text='Add'
							small
							secondary
							className={clsx(style.row1, style.col3)}
							onClick={() => console.log('Add domain name')}
						/>
					</div>
					<div className={style.infoContainer}>
						<h3
							className={clsx(
								style.infoContainerTitle,
								style.row1,
								style.col1
							)}
						>
							Remove domain name:
						</h3>

						<Select
							className={clsx(style.row1, style.col2)}
							styles={customStyles}
							onChange={(option) => {
								console.log(option);
							}}
							options={[
								{
									value: 'linusromland.com',
									label: 'linusromland.com'
								},
								{
									value: 'linusromland.se',
									label: 'linusromland.se'
								}
							]}
						/>
						<Button
							text='Remove'
							small
							secondary
							className={clsx(style.row1, style.col3)}
							onClick={() => console.log('Add domain name')}
						/>
					</div>
				</div>
			</Widget>
		</div>
	);
}
