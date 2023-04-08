// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import Button from '../Button/Button';
import style from './RegistrationForm.module.scss';

const UserSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username must be less than 20 characters')
		.required('Username is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), ''], 'Passwords must match')
		.min(8, 'Password must be at least 8 characters')
		.required('Confirm Password is required')
});

export default function RegistrationForm({
	onSubmit
}: {
	onSubmit: (values: { username: string; email: string; password: string; confirmPassword: string }) => void;
}): JSX.Element {
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
				<Form className={style.form}>
					<Field
						name='username'
						placeholder='Username'
						className={style.input}
					/>
					<ErrorMessage
						name='username'
						component='div'
						className={style.error}
					/>

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

					<Field
						name='confirmPassword'
						placeholder='Confirm Password'
						className={style.input}
						type='password'
					/>
					<ErrorMessage
						name='confirmPassword'
						component='div'
						className={style.error}
					/>
					<div className={style.buttons}>
						<Button
							text='Create User'
							onClick={() => onSubmit(values)}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
