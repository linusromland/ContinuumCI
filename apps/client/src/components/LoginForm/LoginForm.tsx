// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import style from './LoginForm.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import Button from '../Button/Button';

const UserSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

interface LoginFormProps {
	onSubmit: (values: { email: string; password: string; rememberMe: boolean }) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps): JSX.Element {
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

					<Field
						name='password'
						placeholder='Password'
						className={formStyle.formInput}
						type='password'
					/>
					<ErrorMessage
						name='password'
						component='div'
						className={formStyle.formError}
					/>
					<div className={formStyle.formCheckGroup}>
						<label
							htmlFor='rememberMe'
							className={formStyle.label}
						>
							Remember Me
						</label>
						<Field
							name='rememberMe'
							type='checkbox'
						/>
					</div>

					<div className={style.buttons}>
						<Button
							text='Login'
							onClick={() => onSubmit(values)}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
