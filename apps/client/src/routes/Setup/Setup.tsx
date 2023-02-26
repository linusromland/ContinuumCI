// External Dependencies
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import EmailConfigurationInput from './EmailConfigurationInput/EmailConfigurationInput';
import style from './Setup.module.scss';
import { createUser } from '../../utils/api/user';
import { getSetup } from '../../utils/api/setup';
import { updateEmailConfiguration } from '../../utils/api/emailConfiguration';
import { getToken } from '../../utils/api/getToken';
import api from '../../utils/api';

export default function Setup(): JSX.Element {
	const navigate = useNavigate();

	const [stage, setStage] = useState(0);
	const [infoText, setInfoText] = useState('');

	useEffect(() => {
		switch (stage) {
			case 0:
				setInfoText(
					'The first step in configuring ContinuumCI is to create your first root user. This user will have access to all of the features and settings within ContinuumCI and will be responsible for managing your projects.'
				);
				break;
			case 1:
				setInfoText(
					'It is now time to configure the email settings for ContinuumCI. This is not required, but is highly recommended. If you do not configure email settings, ContinuumCI will not be able to send you any notifications.'
				);
				break;
		}
	}, [stage]);

	useEffect(() => {
		(async () => {
			const setup = await getSetup();

			if (setup.status === 'complete') {
				navigate('/');
			}

			if (setup.rootUser) {
				setStage(1);
			}
		})();
	}, []);

	return (
		<SetupLayout>
			<>
				<div className={style.container}>
					<p className={style.subtitle}>{infoText}</p>
					{
						{
							0: (
								<RegistrationForm
									onSubmit={(values) => {
										(async () => {
											const userCreated =
												await createUser({
													username: values.username,
													email: values.email,
													password: values.password
												});

											if (userCreated) {
												const token = await getToken(
													values.email,
													values.password
												);

												if (token) {
													api.defaults.headers.common[
														'Authorization'
													] = `Bearer ${token.access_token}`;
												}

												setStage(1);
											} else {
												toast.error(
													'An error occurred while creating the root user.'
												);
											}
										})();
									}}
								/>
							),
							1: (
								<EmailConfigurationInput
									onSubmit={(skip, values) => {
										(async () => {
											const emailConfiguration =
												await updateEmailConfiguration({
													service: skip
														? 'skipped'
														: values?.service
																?.value || '',
													auth: {
														user:
															values?.gmail
																?.email || '',
														pass:
															values?.gmail
																?.password || ''
													}
												});

											if (emailConfiguration.success) {
												navigate('/');
											} else {
												toast.error(
													emailConfiguration.message ||
														'An error occurred while configuring the email settings.'
												);
											}
										})();
									}}
								/>
							)
						}[stage]
					}
				</div>
			</>
		</SetupLayout>
	);
}
