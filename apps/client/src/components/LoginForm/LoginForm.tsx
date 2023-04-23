// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import style from './LoginForm.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import Button from '../Button/Button';
import useTranslations from '../../i18n/translations';

const UserSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

interface LoginFormProps {
	onSubmit: (values: { email: string; password: string; rememberMe: boolean }) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps): JSX.Element {
	const t = useTranslations();

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberMe: false
			}}
			validationSchema={UserSchema}
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
					<div className={formStyle.formCheckGroup}>
						<label
							htmlFor='rememberMe'
							className={formStyle.label}
						>
							{t.login.rememberMe}
						</label>
						<Field
							name='rememberMe'
							type='checkbox'
						/>
					</div>

					<div className={style.buttons}>
						<Button
							text={t.login.login}
							onClick={() => onSubmit(values)}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
