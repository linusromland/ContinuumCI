// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import style from './ResetPassword.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import Button from '../../components/Button/Button';
import { resetPassword } from '../../utils/api/user';
import { toast } from 'react-toastify';

export default function ResetPassword(): JSX.Element {
	const navigate = useNavigate();

	const ResetPasswordSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required')
	});

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>Reset Password</p>
				<Formik
					initialValues={{
						email: ''
					}}
					validationSchema={ResetPasswordSchema}
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onSubmit={() => {}} // This is required for the validation to work
				>
					{({ values }) => (
						<Form className={formStyle.form}>
							<div className={formStyle.formGroup}>
								<label
									htmlFor='email'
									className={formStyle.formLabel}
								>
									Email
								</label>
								<Field
									name='email'
									placeholder='Email'
									className={formStyle.formInput}
								/>
								<ErrorMessage
									name='email'
									component='div'
									className={formStyle.formError}
								/>
							</div>

							<div className={style.buttons}>
								<Button
									text='Reset password'
									small
									onClick={async () => {
										if (!values.email) return;

										const response = await resetPassword(values.email);
										if (response.success) {
											toast.success(
												"If the email is valid, you'll receive an email with a link to reset your password.",
												{
													position: 'top-left'
												}
											);
										} else {
											toast.error('An error occurred while resetting your password.', {
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
