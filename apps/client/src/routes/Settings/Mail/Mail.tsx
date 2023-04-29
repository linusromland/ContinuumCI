// External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Widget from '../../../components/Widget/Widget';
import style from './Mail.module.scss';
import useTranslations from '../../../i18n/translations';
import EmailConfigurationInput from '../../../components/EmailConfigurationInput/EmailConfigurationInput';
import StatusWidget from '../../../components/StatusWidget/StatusWidget';
import { EmailConfigurationClass } from 'shared/src/classes';
import {
	getEmailConfiguration,
	checkEmailConfiguration,
	updateEmailConfiguration
} from '../../../utils/api/emailConfiguration';
import { Loading } from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';

export default function Nginx(): JSX.Element {
	const t = useTranslations();

	const [configuration, setConfiguration] = useState({} as EmailConfigurationClass);
	const [configurationSet, setConfigurationSet] = useState(false);
	const [configurationWorking, setConfigurationWorking] = useState(false);
	const [dataReady, setDataReady] = useState(false);

	async function getConfigurationData() {
		const response = await getEmailConfiguration();

		if (response) {
			setConfiguration(response);
			if (response.service && response.auth && response.auth.user && response.auth.pass) {
				setConfigurationSet(true);
			}
		}
	}

	async function checkConfiguration() {
		const response = await checkEmailConfiguration();

		setConfigurationWorking(response.success);
	}

	async function getData() {
		await getConfigurationData();
		await checkConfiguration();
		setDataReady(true);
	}

	useEffect(() => {
		getData();
	}, []);

	if (!dataReady) return <Loading />;

	return (
		<>
			<div className={style.main}>
				<Breadcrumbs path={[{ name: t.settings.title }, { name: t.mail.title }]} />

				<h1 className={style.title}>{t.mail.title}</h1>

				<Widget>
					<div className={style.container}>
						<h2>{t.mail.configurationStatus}</h2>
						<StatusWidget
							icon={
								!configurationSet
									? '/icons/warning.svg'
									: configurationWorking
									? '/icons/check.svg'
									: '/icons/cross.svg'
							}
							text={
								!configurationSet
									? t.mail.configurationNotSet
									: configurationWorking
									? t.mail.configurationWorking
									: t.mail.configurationNotWorking
							}
							widget={false}
						/>
					</div>
				</Widget>
				<Widget>
					<div className={style.container}>
						<h2>{t.mail.title}</h2>
						<EmailConfigurationInput
							hideSkip
							saveButtonText={t.mail.save}
							onSubmit={async (_, values) => {
								const emailConfiguration = await updateEmailConfiguration({
									service: values?.service?.value || '',
									auth: {
										user: values?.gmail?.email || '',
										pass: values?.gmail?.password || ''
									}
								});

								if (emailConfiguration.success) {
									toast.success(t.setup.emailSettingsSuccess);
									getData();
								} else {
									toast.error(t.setup.emailSettingsError);
								}
							}}
							initialValues={{
								service: {
									value: configuration?.service || 'gmail',
									label:
										configuration?.service
											?.charAt(0)
											.toUpperCase()
											.concat(configuration?.service?.slice(1)) || 'Gmail'
								},
								gmail: {
									email: configuration?.auth?.user,
									password: configuration?.auth?.pass
								}
							}}
						/>
					</div>
				</Widget>
			</div>
		</>
	);
}
