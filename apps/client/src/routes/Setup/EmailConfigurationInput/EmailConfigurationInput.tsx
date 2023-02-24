// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import Button from '../../../components/Button/Button';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import style from './EmailConfigurationInput.module.scss';

const EmailConfigurationSchema = Yup.object().shape({
	service: Yup.object().shape({
		value: Yup.string().required('Service is required'),
		label: Yup.string().required('Service is required')
	}),
	gmail: Yup.object().shape({
		email: Yup.string()
			.email('Invalid email')
			.required('Email is required'),
		password: Yup.string().required('Password is required')
	})
});

export default function EmailConfigurationInput({
	onSubmit
}: {
	onSubmit: (values: {
		service: {
			value: string;
			label: string;
		};
		gmail: {
			email: string;
			password: string;
		};
	}) => void;
}): JSX.Element {
	return (
		<Formik
			initialValues={{
				service: {
					value: 'gmail',
					label: 'Gmail'
				},
				gmail: {
					email: '',
					password: ''
				}
			}}
			validationSchema={EmailConfigurationSchema}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onSubmit={() => {}} // This is required for the validation to work
		>
			{({ values }) => (
				<Form className={style.form}>
					<Field
						name='service'
						placeholder='Service'
						component={CustomSelect}
						options={[{ value: 'gmail', label: 'Gmail' }]}
					/>
					<ErrorMessage
						name='service'
						component='div'
						className={style.error}
					/>

					{values.service.value === 'gmail' && (
						<>
							<Field
								name='gmail.email'
								placeholder='Email'
								className={style.input}
							/>
							<ErrorMessage
								name='gmail.email'
								component='div'
								className={style.error}
							/>

							<Field
								name='gmail.password'
								placeholder='One Time Password'
								className={style.input}
							/>
							<ErrorMessage
								name='gmail.password'
								component='div'
								className={style.error}
							/>
						</>
					)}

					<Button
						text='Continue'
						onClick={() => onSubmit(values)}
					/>
				</Form>
			)}
		</Formik>
	);
}
