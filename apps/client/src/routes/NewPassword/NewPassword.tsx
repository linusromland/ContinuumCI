// External Dependencies
import { useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

// Internal Dependencies
import style from './NewPassword.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import Button from '../../components/Button/Button';
import { toast } from 'react-toastify';
import { updatePasswordWithResetToken, validateResetToken } from '../../utils/api/user';

export default function NewPassword(): JSX.Element {
	const navigate = useNavigate();
	const { token } = useParams();

	const NewPasswordSchema = Yup.object().shape({
		password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('newPassword')], 'Passwords must match')
			.required('Password is required')
	});

	async function validateToken() {
		if (!token) return;

		const response = await validateResetToken(token);

		if (!response.success) {
			toast.error('Invalid token');
			navigate('/login');
		}
	}

	useEffect(() => {
		validateToken();
	}, [token]);

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>Reset your password</p>
				<Formik
					initialValues={{
						password: '',
						confirmPassword: ''
					}}
					validationSchema={NewPasswordSchema}
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onSubmit={() => {}} // This is required for the validation to work
				>
					{({ values }) => (
						<Form className={formStyle.form}>
							<div className={formStyle.formGroup}>
								<label
									htmlFor='password'
									className={formStyle.formLabel}
								>
									New Password
								</label>
								<Field
									name='password'
									placeholder='New Password'
									type='password'
									className={formStyle.formInput}
								/>
								<ErrorMessage
									name='password'
									component='div'
									className={formStyle.formError}
								/>
							</div>

							<div className={formStyle.formGroup}>
								<label
									htmlFor='confirmPassword'
									className={formStyle.formLabel}
								>
									Confirm Password
								</label>
								<Field
									name='confirmPassword'
									placeholder='Confirm Password'
									type='password'
									className={formStyle.formInput}
								/>
								<ErrorMessage
									name='confirmPassword'
									component='div'
									className={formStyle.formError}
								/>
							</div>

							<div className={style.buttons}>
								<Button
									text='Reset password'
									small
									onClick={async () => {
										if (!token || !values.password || values.password !== values.confirmPassword)
											return;

										const response = await updatePasswordWithResetToken(token, values.password);

										if (response.success) {
											toast.success('Successfully updated password!', {
												position: 'top-left'
											});
										} else {
											toast.error('An error occurred while updating the password.', {
												position: 'top-left'
											});
										}

										navigate('/login');
									}}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}
