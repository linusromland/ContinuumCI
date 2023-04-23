// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import Button from '../Button/Button';
import style from './RegistrationForm.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import useTranslations from '../../i18n/translations';

interface RegistrationFormProps {
	onSubmit: (values: { username: string; email: string; password: string; confirmPassword: string }) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps): JSX.Element {
	const t = useTranslations();

	const UserSchema = Yup.object().shape({
		username: Yup.string()
			.min(3, t.register.schema.username.min)
			.max(20, t.register.schema.username.max)
			.required(t.register.schema.username.required),
		email: Yup.string().email(t.register.schema.email.invalid).required(t.register.schema.email.required),
		password: Yup.string().min(8, t.register.schema.password.min).required(t.register.schema.password.required),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), ''], t.register.schema.confirmPassword.notMatch)
			.min(8, t.register.schema.password.min)
			.required(t.register.schema.confirmPassword.required)
	});

	return (
		<Formik
			initialValues={{
				username: '',
				email: '',
				password: '',
				confirmPassword: ''
			}}
			validationSchema={UserSchema}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onSubmit={() => {}} // This is required for the validation to work
		>
			{({ values }) => (
				<Form className={formStyle.form}>
					<div className={formStyle.formGroup}>
						<label
							htmlFor='username'
							className={formStyle.formLabel}
						>
							{t.register.username}
						</label>
						<Field
							name='username'
							placeholder={t.register.username}
							className={formStyle.formInput}
						/>
						<ErrorMessage
							name='username'
							component='div'
							className={formStyle.formError}
						/>{' '}
					</div>
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
					<div className={formStyle.formGroup}>
						<label
							htmlFor='password'
							className={formStyle.formLabel}
						>
							{t.login.password}
						</label>
						<Field
							name='password'
							placeholder={t.login.password}
							className={formStyle.formInput}
							type='password'
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
							{t.register.confirmPassword}
						</label>

						<Field
							name='confirmPassword'
							placeholder={t.register.confirmPassword}
							className={formStyle.formInput}
							type='password'
						/>
						<ErrorMessage
							name='confirmPassword'
							component='div'
							className={formStyle.formError}
						/>
					</div>

					<div className={style.buttons}>
						<Button
							text={t.register.create}
							onClick={() => onSubmit(values)}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
