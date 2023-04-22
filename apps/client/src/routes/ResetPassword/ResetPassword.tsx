// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Internal Dependencies
import style from './ResetPassword.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import Button from '../../components/Button/Button';

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
										console.log(values);
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
