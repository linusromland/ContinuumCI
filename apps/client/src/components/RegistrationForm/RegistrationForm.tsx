// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import Button from '../Button/Button';
import style from './RegistrationForm.module.scss';
import formStyle from '../../styles/formStyle.module.scss';

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

interface RegistrationFormProps {
	onSubmit: (values: { username: string; email: string; password: string; confirmPassword: string }) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps): JSX.Element {
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
					<Field
						name='username'
						placeholder='Username'
						className={formStyle.formInput}
					/>
					<ErrorMessage
						name='username'
						component='div'
						className={formStyle.formError}
					/>

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

					<Field
						name='confirmPassword'
						placeholder='Confirm Password'
						className={formStyle.formInput}
						type='password'
					/>
					<ErrorMessage
						name='confirmPassword'
						component='div'
						className={formStyle.formError}
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
