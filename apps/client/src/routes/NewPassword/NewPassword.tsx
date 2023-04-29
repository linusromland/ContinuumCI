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
import useTranslations from '../../i18n/translations';

export default function NewPassword(): JSX.Element {
	const t = useTranslations();
	const navigate = useNavigate();
	const { token } = useParams();

	const NewPasswordSchema = Yup.object().shape({
		password: Yup.string()
			.min(8, t.newPassword.schema.password.min)
			.required(t.newPassword.schema.password.required),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], t.newPassword.schema.confirmPassword.match)
			.required(t.newPassword.schema.confirmPassword.required)
	});

	async function validateToken() {
		if (!token) return;

		const response = await validateResetToken(token);

		if (!response.success) {
			toast.error(t.newPassword.invalidToken);
			navigate('/login');
		}
	}

	useEffect(() => {
		validateToken();
	}, [token]);

	return (
		<>
			<div className={style.container}>
				<p className={style.subtitle}>{t.newPassword.title}</p>
				<Formik
					initialValues={{
						password: '',
						confirmPassword: ''
					}}
					validationSchema={NewPasswordSchema}
					onSubmit={async (values) => {
						if (!token || !values.password || values.password !== values.confirmPassword) return;

						const response = await updatePasswordWithResetToken(token, values.password);

						if (response.success) {
							toast.success(t.newPassword.submitSuccess);
						} else {
							toast.error(t.newPassword.submitError);
						}

						navigate('/login');
					}}
				>
					{({ dirty, isSubmitting }) => (
						<Form className={formStyle.form}>
							<div className={formStyle.formGroup}>
								<label
									htmlFor='password'
									className={formStyle.formLabel}
								>
									{t.newPassword.newPassword}
								</label>
								<Field
									name='password'
									placeholder={t.newPassword.newPassword}
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
									{t.newPassword.confirmPassword}
								</label>
								<Field
									name='confirmPassword'
									placeholder={t.newPassword.confirmPassword}
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
									text={t.newPassword.submit}
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
