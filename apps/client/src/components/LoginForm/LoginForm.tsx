// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import Button from '../Button/Button';
import style from './LoginForm.module.scss';

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
				<Form className={style.form}>
					<Field
						name='email'
						placeholder='Email'
						className={style.input}
					/>
					<ErrorMessage
						name='email'
						component='div'
						className={style.error}
					/>

					<Field
						name='password'
						placeholder='Password'
						className={style.input}
						type='password'
					/>
					<ErrorMessage
						name='password'
						component='div'
						className={style.error}
					/>
					<div className={style.checkboxContainer}>
						<Field
							name='rememberMe'
							type='checkbox'
							className={style.checkbox}
						/>
						<label
							htmlFor='rememberMe'
							className={style.label}
						>
							Remember Me
						</label>
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
