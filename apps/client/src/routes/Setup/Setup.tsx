// External Dependencies
import { useEffect, useState } from 'react';

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
		<SetupLayout title='Welcome to ContinuumCI!'>
			<>
				<div className={style.container}>
					<p className={style.subtitle}>{infoText}</p>
					<UserInput
						onSubmit={async (values) => {
							const userCreated = await createUser({
								username: values.username,
								email: values.email,
								password: values.password
							});

							if (userCreated) {
								setStage(1);
							}
						}}
					/>
				</div>
			</>
		</SetupLayout>
	);
}
