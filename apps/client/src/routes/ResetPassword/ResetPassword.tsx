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
import useTranslations from '../../i18n/translations';

export default function ResetPassword(): JSX.Element {
	const t = useTranslations();
	const navigate = useNavigate();

	const ResetPasswordSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required')
	});

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>{t.resetPassword.title}</p>
				<Formik
					initialValues={{
						email: ''
					}}
					validationSchema={ResetPasswordSchema}
					onSubmit={async (values) => {
						const response = await resetPassword(values.email);
						if (response.success) {
							toast.success(t.resetPassword.successReset, {
								position: 'top-left'
							});
						} else {
							toast.error(t.resetPassword.errorReset, {
								position: 'top-left'
							});
						}

						navigate('/login');
					}}
				>
					{({ isSubmitting, dirty }) => (
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
									text={t.resetPassword.title}
									small
									type='submit'
									disabled={!dirty || isSubmitting}
									icon='/icons/save.svg'
									loading={isSubmitting}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}
