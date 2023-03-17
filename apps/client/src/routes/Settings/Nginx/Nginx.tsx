// External dependencies
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Select from 'react-select';

// Internal dependencies
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../../components/Button/Button';
import Widget from '../../../components/Widget/Widget';
import style from './Nginx.module.scss';
import { createDomain, getDomains } from '../../../utils/api/domains';
import { toast } from 'react-toastify';
import { DomainsClass } from 'shared/src/classes';

export default function Nginx(): JSX.Element {
	const [domainNames, setDomainNames] = useState([] as string[]);
	const [newDomainName, setNewDomainName] = useState('');
	const [selectedDomainName, setSelectedDomainName] = useState('');

	async function getDomainsData() {
		const response = await getDomains();
		if (response.success) {
			setDomainNames(
				(response.data as DomainsClass[]).map((domain) => domain.name)
			);
		}
	}

	useEffect(() => {
		getDomainsData();
	}, []);

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
						{/* List of all domain names */}
						{domainNames.map((domainName, index) => (
							<p
								className={clsx(
									style.infoContainerValue,
									style[`row${index + 1}`],
									style.col2
								)}
							>
								{domainName}
							</p>
						))}

						{domainNames.length === 0 && (
							<p
								className={clsx(
									style.infoContainerValue,
									style.row1,
									style.col2
								)}
							>
								No domain names available
							</p>
						)}
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
							value={newDomainName}
							onChange={(e) => {
								setNewDomainName(e.target.value);
							}}
						/>

						<Button
							text='Add'
							small
							secondary
							className={clsx(style.row1, style.col3)}
							onClick={async () => {
								if (!newDomainName) return;

								const response = await createDomain(
									newDomainName
								);

								if (response) {
									getDomainsData();
									setNewDomainName('');
								} else {
									toast.error('Failed to create domain');
								}
							}}
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
								if (option && option.value)
									setSelectedDomainName(option.value);
							}}
							value={{
								value: selectedDomainName,
								label: selectedDomainName
							}}
							options={domainNames.map((domainName) => ({
								value: domainName,
								label: domainName
							}))}
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
