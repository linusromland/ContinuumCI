// External Dependencies
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Internal Dependencies
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import UserInput from './UserInput/UserInput';
import style from './Setup.module.scss';
import { createUser } from '../../utils/api/user';
import { getSetup } from '../../utils/api/setup';

export default function Setup(): JSX.Element {
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
					<UserInput
						onSubmit={(values) => {
							(async () => {
								console.log('Creating user');
								const userCreated = await createUser({
									username: values.username,
									email: values.email,
									password: values.password
								});

								console.log('User created', userCreated);

								if (userCreated) {
									setStage(1);
								} else {
									toast.error(
										'An error occurred while creating the root user.'
									);
								}
							})();
						}}
					/>
				</div>
			</>
		</SetupLayout>
	);
}
