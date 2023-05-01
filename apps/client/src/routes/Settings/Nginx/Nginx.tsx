// External dependencies
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';

// Internal dependencies
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import TextEditModal from '../../../components/TextEditModal/TextEditModal';
import Button from '../../../components/Button/Button';
import Widget from '../../../components/Widget/Widget';
import style from './Nginx.module.scss';
import { createDomain, deleteDomain, getDomains } from '../../../utils/api/nginx/domains';
import { toast } from 'react-toastify';
import { NginxConfigurationType } from 'shared/src/types';
import { getConfiguration, updateConfiguration } from '../../../utils/api/nginx/configuration';
import useTranslations from '../../../i18n/translations';
import { Loading } from '../../../components/Loading/Loading';

export default function Nginx(): JSX.Element {
	const t = useTranslations();

	const [domainNames, setDomainNames] = useState(
		[] as {
			value: string;
			label: string;
		}[]
	);
	const [nginxConfiguration, setNginxConfiguration] = useState({} as NginxConfigurationType);
	const [sitesEnabledDirectoryModal, setSitesEnabledDirectoryModal] = useState(false);
	const [accessLogLocationModal, setAccessLogLocationModal] = useState(false);
	const [localIpAdressesModal, setLocalIpAdressesModal] = useState(false);
	const [newDomainModal, setNewDomainModal] = useState(false);
	const [dataReady, setDataReady] = useState(false);
	const [confirmRemoveDomain, setConfirmRemoveDomain] = useState('');

	async function getDomainsData() {
		const response = await getDomains();
		if (response.success && response.data) {
			setDomainNames(
				response.data.map((domainName) => ({
					value: domainName._id,
					label: domainName.name
				}))
			);
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
			toast.success(t.nginx.configuration.successfullyUpdated);
		} else {
			toast.error(t.nginx.configuration.failedToUpdate);
		}
	}

	async function getData() {
		await getDomainsData();
		await getConfigurationData();
		setDataReady(true);
	}

	useEffect(() => {
		getData();
	}, []);

	if (!dataReady) return <Loading />;

	return (
		<>
			<div className={style.main}>
				<Breadcrumbs path={[{ name: t.settings.title }, { name: t.nginx.nginx }]} />

				<h1 className={style.title}>{t.nginx.title}</h1>
				<Widget>
					<div className={style.container}>
						<h2>{t.nginx.configuration.title}</h2>

						<div className={style.infoContainer}>
							<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>
								{t.nginx.configuration.sitesEnabledDirectory}:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row1, style.col2)}>
								{nginxConfiguration.sitesEnabledLocation || t.nginx.configuration.notSet}
							</p>
							<Button
								text={t.nginx.configuration.edit}
								onClick={() => setSitesEnabledDirectoryModal(true)}
								small
								theme='secondary'
								className={clsx(style.row1, style.col3)}
							/>
							<h3 className={clsx(style.infoContainerTitle, style.row2, style.col1)}>
								{t.nginx.configuration.accessLogLocation}:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row2, style.col2)}>
								{nginxConfiguration.accessLogLocation || t.nginx.configuration.notSet}
							</p>
							<Button
								text={t.nginx.configuration.edit}
								onClick={() => setAccessLogLocationModal(true)}
								small
								theme='secondary'
								className={clsx(style.row2, style.col3)}
							/>
							<h3 className={clsx(style.infoContainerTitle, style.row3, style.col1)}>
								{t.nginx.configuration.localIpAddresses}:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row3, style.col2)}>
								{nginxConfiguration.localIps || t.nginx.configuration.notSet}
							</p>
							<Button
								text={t.nginx.configuration.edit}
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
						<h2 className={style.subtitle}>{t.nginx.domains.title}</h2>
						<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>
							{t.nginx.domains.availableDomains}:
						</h3>
						<div className={style.infoContainer}>
							{domainNames.map((domainName, index) => (
								<>
									<p className={clsx(style.infoContainerValue, style[`row${index + 1}`], style.col1)}>
										{domainName.label}
									</p>
									<Button
										text={
											confirmRemoveDomain !== domainName.value
												? t.nginx.domains.remove
												: t.nginx.domains.confirmRemove
										}
										onClick={async () => {
											if (confirmRemoveDomain !== domainName.value) {
												setConfirmRemoveDomain(domainName.value);
												return;
											}

											const response = await deleteDomain(domainName.value);

											if (response) {
												getDomainsData();
												setConfirmRemoveDomain('');
												toast.success(t.nginx.domains.successRemoveDomain);
											} else {
												toast.error(t.nginx.domains.failedToRemoveDomain);
											}
										}}
										small
										theme='error'
										icon='/icons/delete.svg'
										className={clsx(style[`row${index + 1}`], style.col2)}
									/>
								</>
							))}

							{domainNames.length === 0 && (
								<p className={clsx(style.infoContainerValue, style.row1, style.col1)}>
									{t.nginx.domains.noDomainsFound}
								</p>
							)}
						</div>
						<div className={style.infoContainer}>
							<Button
								text={t.nginx.domains.add}
								small
								theme='secondary'
								className={clsx(style.row1, style.col1)}
								onClick={() => setNewDomainModal(true)}
							/>
						</div>
					</div>
				</Widget>
			</div>

			<TextEditModal
				title={`${
					t.nginx.configuration.edit
				} ${t.nginx.configuration.sitesEnabledDirectory.toLocaleLowerCase()}`}
				fieldName={t.nginx.configuration.sitesEnabledDirectory.toLocaleLowerCase()}
				open={sitesEnabledDirectoryModal}
				onClose={() => {
					setSitesEnabledDirectoryModal(false);
				}}
				initialValues={{
					[t.nginx.configuration.sitesEnabledDirectory.toLocaleLowerCase()]:
						nginxConfiguration.sitesEnabledLocation
				}}
				validationSchema={Yup.object().shape({
					sitesEnabledLocation: Yup.string().required(t.nginx.configuration.sitesEnabledDirectoryRequired)
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
				title={t.nginx.configuration.edit + ' ' + t.nginx.configuration.accessLogLocation.toLocaleLowerCase()}
				fieldName={t.nginx.configuration.accessLogLocation.toLocaleLowerCase()}
				open={accessLogLocationModal}
				onClose={() => {
					setAccessLogLocationModal(false);
				}}
				initialValues={{
					[t.nginx.configuration.accessLogLocation.toLocaleLowerCase()]: nginxConfiguration.accessLogLocation
				}}
				validationSchema={Yup.object().shape({
					accessLogLocation: Yup.string().required(t.nginx.configuration.accessLogLocationRequired)
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
				title={t.nginx.configuration.edit + ' ' + t.nginx.configuration.localIpAddresses.toLocaleLowerCase()}
				fieldName={t.nginx.configuration.localIpAddresses.toLocaleLowerCase()}
				open={localIpAdressesModal}
				onClose={() => {
					setLocalIpAdressesModal(false);
				}}
				initialValues={{
					[t.nginx.configuration.localIpAddresses.toLocaleLowerCase()]: nginxConfiguration.localIps
				}}
				validationSchema={Yup.object().shape({
					localIps: Yup.string().required(t.nginx.configuration.localIpAddressesRequired)
				})}
				submit={async (values) => {
					editConfiguration({
						sitesEnabledLocation: nginxConfiguration.sitesEnabledLocation,
						accessLogLocation: nginxConfiguration.accessLogLocation,
						localIps: values.localIps
					});
				}}
			/>

			<TextEditModal
				title={t.nginx.domains.addDomainName}
				fieldName={t.nginx.domains.domain}
				open={newDomainModal}
				onClose={() => {
					setNewDomainModal(false);
				}}
				initialValues={{
					[t.nginx.domains.domain]: ''
				}}
				validationSchema={Yup.object().shape({
					[t.nginx.domains.domain]: Yup.string().required(t.nginx.domains.domainNameRequired)
				})}
				submitText={t.nginx.domains.add}
				submit={async (values) => {
					const response = await createDomain(values[t.nginx.domains.domain]);

					if (response) {
						getDomainsData();
						setNewDomainModal(false);
						toast.success(t.nginx.domains.domainAdded);
					} else {
						toast.error(t.nginx.domains.failedToAddDomain);
					}
				}}
			/>
		</>
	);
}
