// External Dependencies
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal Dependencies
import style from './Login.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import setToken from '../../utils/setToken';
import { createUser, getUser } from '../../utils/api/user';

export default function Login(): JSX.Element {
	const navigate = useNavigate();
	const [registered, setRegistered] = useState(false);

	useEffect(() => {
		(async () => {
			const response = await getUser();
			if (response.success) navigate('/');
		})();
	}, []);

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>
					{registered
						? 'Welcome! Please register for an account.'
						: 'Welcome back! Please login to your account.'}
				</p>
				{registered ? (
					<RegistrationForm
						onSubmit={(values) => {
							(async () => {
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
									toast.success('Successfully created user!');
									navigate('/');
								} else {
									toast.error(
										'An error occurred while creating the root user.'
									);
								}
							})();
						}}
					/>
				) : (
					<LoginForm
						onSubmit={(values) => {
							(async () => {
								await setToken({
									email: values.email,
									password: values.password,
									rememberMe: values.rememberMe
								});
								toast.success('Successfully logged in!');
								navigate('/');
							})();
						}}
					/>
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
		</>
	);
}
