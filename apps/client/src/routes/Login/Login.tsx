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
import useTranslations from '../../i18n/translations';

export default function Login(): JSX.Element {
	const t = useTranslations();
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
				<p className={style.subtitle}>{registered ? t.register.title : t.login.title}</p>
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
									toast.success(t.register.successCreate);
									navigate('/');
								} else {
									toast.error(t.register.errorCreate);
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
									toast.success(t.login.successLogin);
									navigate('/');
								} catch (e) {
									toast.error(t.login.invalidLogin);
								}
							})();
						}}
					/>
				)}

				{!registered && (
					<p className={style.footerText}>
						{t.login.forgotPassword + ' '}
						<Link
							to='/resetPassword'
							className={style.link}
						>
							{t.login.resetPassword}
						</Link>
					</p>
				)}

				<p className={style.footerText}>
					{(registered ? t.register.alreadyRegistered : t.login.notRegistered) + ' '}
					<a
						onClick={() => setRegistered(!registered)}
						className={style.link}
					>
						{registered ? t.login.login : t.register.register}
					</a>
				</p>
			</div>
		</>
	);
}
