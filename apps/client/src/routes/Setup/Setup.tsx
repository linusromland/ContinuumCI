// External Dependencies
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import EmailConfigurationInput from '../../components/EmailConfigurationInput/EmailConfigurationInput';
import style from './Setup.module.scss';
import { createUser } from '../../utils/api/user';
import { getSetup } from '../../utils/api/setup';
import { updateEmailConfiguration } from '../../utils/api/emailConfiguration';
import setToken from '../../utils/setToken';
import { SetupType } from 'shared/src/types';
import useTranslations from '../../i18n/translations';

export default function Setup(): JSX.Element {
	const t = useTranslations();
	const navigate = useNavigate();

	const [stage, setStage] = useState(0);
	const [infoText, setInfoText] = useState('');

	useEffect(() => {
		switch (stage) {
			case 0:
				setInfoText(t.setup.rootConfiguration);
				break;
			case 1:
				setInfoText(t.setup.emailConfiguration);
				break;
		}
	}, [stage]);

	useEffect(() => {
		(async () => {
			const setup = await getSetup();
			const setupResponse = setup.data as SetupType;

			if (setupResponse.status === 'complete') {
				navigate('/');
			}

			if (setupResponse.rootUser) {
				setStage(1);
			}
		})();
	}, []);

	return (
		<>
			<>
				<div className={style.container}>
					<p className={style.subtitle}>{infoText}</p>
					{
						{
							0: (
								<RegistrationForm
									onSubmit={async (values) => {
										const userCreated = await createUser({
											username: values.username,
											email: values.email,
											password: values.password
										});

										if (userCreated) {
											await setToken({
												email: values.email,
												password: values.password
											});

											setStage(1);
										} else {
											toast.error(t.setup.userCreateError);
										}
									}}
								/>
							),
							1: (
								<EmailConfigurationInput
									onSubmit={async (skip, values) => {
										const emailConfiguration = await updateEmailConfiguration({
											service: skip ? 'skipped' : values?.service?.value || '',
											auth: {
												user: values?.gmail?.email || '',
												pass: values?.gmail?.password || ''
											}
										});

										if (emailConfiguration.success) {
											navigate('/');
										} else {
											toast.error(t.setup.emailSettingsError);
										}
									}}
								/>
							)
						}[stage]
					}
				</div>
			</>
		</>
	);
}
