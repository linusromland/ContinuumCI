// External Dependencies
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
									toast.success('Successfully created user!', {
										position: 'top-left'
									});
									navigate('/');
								} else {
									toast.error('An error occurred while creating the user.', {
										position: 'top-left'
									});
								}
							})();
						}}
					/>
				) : (
					<LoginForm
						onSubmit={(values) => {
							(async () => {
								try {
									await setToken({
										email: values.email,
										password: values.password,
										rememberMe: values.rememberMe
									});
									toast.success('Successfully logged in!');
									navigate('/');
								} catch (e) {
									toast.error('Invalid email or password.', {
										position: 'top-left'
									});
								}
							})();
						}}
					/>
				)}

				{!registered && (
					<p className={style.footerText}>
						Forgot password?{' '}
						<Link
							to='/resetPassword'
							className={style.link}
						>
							Reset password
						</Link>
					</p>
				)}

				<p className={style.footerText}>
					{registered ? 'Already have an account?' : "Don't have an account?"}{' '}
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
