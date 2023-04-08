// External Dependencies
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import Button from '../../components/Button/Button';
import style from './Welcome.module.scss';

export default function Welcome(): JSX.Element {
	const navigate = useNavigate();

	function handleGetStarted(): void {
		navigate('/setup');
	}

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>
					We are thrilled to have you on board and ready to start managing your projects, nginx, docker, and
					more with our powerful, free, and open-source software.
				</p>
				<p className={style.subtitle}>
					In this first time setup guide, we will walk you through the necessary steps to set up your
					ContinuumCI instance, create the first root user, configure email settings, set up Nginx, and more.
					By following these instructions carefully, you will be up and running in no time and ready to start
					managing your projects with ease.
				</p>
				<p className={style.subtitle}>
					The first step in configuring ContinuumCI is to create your first root user. This user will have
					access to all of the features and settings within ContinuumCI and will be responsible for managing
					your projects. You can do this by logging into the ContinuumCI web interface and following the
					prompts to create your user.
				</p>
				<Button
					onClick={handleGetStarted}
					text='Get Started'
				/>
			</div>
		</>
	);
}
