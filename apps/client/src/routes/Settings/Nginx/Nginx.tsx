// External dependencies
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import Select from 'react-select';

// Internal dependencies
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import TextEditModal from '../../../components/TextEditModal/TextEditModal';
import Button from '../../../components/Button/Button';
import Widget from '../../../components/Widget/Widget';
import style from './Nginx.module.scss';
import { createDomain, deleteDomain, getDomains } from '../../../utils/api/nginx/domains';
import { toast } from 'react-toastify';
import { DomainsClass } from 'shared/src/classes';
import { NginxConfigurationType } from 'shared/src/types';
import { getConfiguration, updateConfiguration } from '../../../utils/api/nginx/configuration';

export default function Nginx(): JSX.Element {
	const [domainNames, setDomainNames] = useState([] as DomainsClass[]);
	const [nginxConfiguration, setNginxConfiguration] = useState({} as NginxConfigurationType);
	const [newDomainName, setNewDomainName] = useState('');
	const [sitesEnabledDirectoryModal, setSitesEnabledDirectoryModal] = useState(false);
	const [accessLogLocationModal, setAccessLogLocationModal] = useState(false);
	const [localIpAdressesModal, setLocalIpAdressesModal] = useState(false);
	const [selectedDomainName, setSelectedDomainName] = useState(
		{} as {
			value: string;
			label: string;
		} | null
	);

	async function getDomainsData() {
		const response = await getDomains();
		if (response.success && response.data) {
			setDomainNames(response.data);
		}
	}

	async function getConfigurationData() {
		const response = await getConfiguration();
		if (response.success && response.data) {
			setNginxConfiguration(response.data);
		}
	}

	async function editConfiguration(configuration: NginxConfigurationType): Promise<void> {
		const response = await updateConfiguration(configuration);
		if (response.success) {
			getConfigurationData();
			toast.success('Configuration updated');
		} else {
			toast.error(response.message);
		}
	}

	useEffect(() => {
		getDomainsData();
		getConfigurationData();
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
		<>
			<div className={style.main}>
				<Breadcrumbs path={[{ name: 'Settings' }, { name: 'Nginx' }]} />

				<h1 className={style.title}>Nginx Settings</h1>
				<Widget>
					<div className={style.container}>
						<h2 className={style.subtitle}>Configuration</h2>

						<div className={style.infoContainer}>
							<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>
								Sites Enabled Directory:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row1, style.col2)}>
								{nginxConfiguration.sitesEnabledLocation || 'Not set'}
							</p>
							<Button
								text='Change'
								onClick={() => setSitesEnabledDirectoryModal(true)}
								small
								theme='secondary'
								className={clsx(style.row1, style.col3)}
							/>
							<h3 className={clsx(style.infoContainerTitle, style.row2, style.col1)}>
								Access Log Location:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row2, style.col2)}>
								{nginxConfiguration.accessLogLocation || 'Not set'}
							</p>
							<Button
								text='Change'
								onClick={() => setAccessLogLocationModal(true)}
								small
								theme='secondary'
								className={clsx(style.row2, style.col3)}
							/>
							<h3 className={clsx(style.infoContainerTitle, style.row3, style.col1)}>
								Local IP-Adresses:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row3, style.col2)}>
								{nginxConfiguration.localIps || 'Not set'}
							</p>
							<Button
								text='Change'
								onClick={() => setLocalIpAdressesModal(true)}
								small
								theme='secondary'
								className={clsx(style.row3, style.col3)}
							/>
						</div>
					</div>
				</Widget>
				<Widget>
					<div className={style.container}>
						<h2 className={style.subtitle}>Domain names</h2>

						{/* List of all avaible domain names, button to remove a domain name & input to add a new domain name */}
						<div className={style.infoContainer}>
							<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>
								Available domain names:
							</h3>
							{/* List of all domain names */}
							{domainNames.map((domainName, index) => (
								<p className={clsx(style.infoContainerValue, style[`row${index + 1}`], style.col2)}>
									{domainName.name}
								</p>
							))}

							{domainNames.length === 0 && (
								<p className={clsx(style.infoContainerValue, style.row1, style.col2)}>
									No domain names available
								</p>
							)}
						</div>
						<div className={clsx(style.infoContainer, style.actions)}>
							<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>Add domain name:</h3>
							<input
								className={clsx(style.input, style.row1, style.col2)}
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
								theme='secondary'
								className={clsx(style.row1, style.col3)}
								onClick={async () => {
									if (!newDomainName) return;

									const response = await createDomain(newDomainName);

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
							<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>
								Remove domain name:
							</h3>

							<Select
								className={clsx(style.row1, style.col2)}
								styles={customStyles}
								onChange={(option) => {
									if (option && option.value) setSelectedDomainName(option);
								}}
								value={selectedDomainName}
								options={domainNames.map((domainName) => ({
									value: domainName._id,
									label: domainName.name
								}))}
							/>
							<Button
								text='Remove'
								small
								theme='secondary'
								className={clsx(style.row1, style.col3)}
								onClick={async () => {
									if (!selectedDomainName) return;

									const response = await deleteDomain(selectedDomainName.value);

									if (response) {
										getDomainsData();
										setSelectedDomainName(null);
									} else {
										toast.error('Failed to delete domain');
									}
								}}
							/>
						</div>
					</div>
				</Widget>
			</div>

			<TextEditModal
				title='Change Sites Enabled Directory'
				fieldName='sitesEnabledLocation'
				open={sitesEnabledDirectoryModal}
				onClose={() => {
					setSitesEnabledDirectoryModal(false);
				}}
				initialValues={{
					sitesEnabledLocation: nginxConfiguration.sitesEnabledLocation
				}}
				validationSchema={Yup.object().shape({
					sitesEnabledLocation: Yup.string().required('Sites Enabled Directory is required')
				})}
				submit={async (values) => {
					editConfiguration({
						sitesEnabledLocation: values.sitesEnabledLocation,
						accessLogLocation: nginxConfiguration.accessLogLocation,
						localIps: nginxConfiguration.localIps
					});
				}}
			/>

			<TextEditModal
				title='Change Access Log Location'
				fieldName='accessLogLocation'
				open={accessLogLocationModal}
				onClose={() => {
					setAccessLogLocationModal(false);
				}}
				initialValues={{
					accessLogLocation: nginxConfiguration.accessLogLocation
				}}
				validationSchema={Yup.object().shape({
					accessLogLocation: Yup.string().required('Access Log Location is required')
				})}
				submit={async (values) => {
					editConfiguration({
						sitesEnabledLocation: nginxConfiguration.sitesEnabledLocation,
						accessLogLocation: values.accessLogLocation,
						localIps: nginxConfiguration.localIps
					});
				}}
			/>

			<TextEditModal
				title='Change Local IP-Adresses'
				fieldName='localIps'
				open={localIpAdressesModal}
				onClose={() => {
					setLocalIpAdressesModal(false);
				}}
				initialValues={{
					localIps: nginxConfiguration.localIps
				}}
				validationSchema={Yup.object().shape({
					localIps: Yup.string().required('Local IP-Adresses is required')
				})}
				submit={async (values) => {
					editConfiguration({
						sitesEnabledLocation: nginxConfiguration.sitesEnabledLocation,
						accessLogLocation: nginxConfiguration.accessLogLocation,
						localIps: values.localIps
					});
				}}
			/>
		</>
	);
}
