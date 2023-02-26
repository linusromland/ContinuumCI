// External Dependencies
import { useState } from 'react';

// Internal Dependencies
import style from './Login.module.scss';
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default function Login(): JSX.Element {
	const [registered, setRegistered] = useState(false);

	return (
		<SetupLayout>
			<div className={style.container}>
				<p className={style.subtitle}>
					{registered
						? 'Welcome! Please register for an account.'
						: 'Welcome back! Please login to your account.'}
				</p>
				{registered ? (
					<RegistrationForm onSubmit={console.log} />
				) : (
					<LoginForm onSubmit={console.log} />
				)}

				<p className={style.footerText}>
					{registered
						? 'Already have an account?'
						: "Don't have an account?"}{' '}
					<a
						onClick={() => setRegistered(!registered)}
						className={style.link}
					>
						{registered ? 'Login' : 'Register'}
					</a>
				</p>
			</div>
		</SetupLayout>
	);
}
