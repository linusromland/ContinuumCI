// External dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

// Internal dependencies
import formStyle from '../../../../../styles/formStyle.module.scss';
import Button from '../../../../../components/Button/Button';
import { updatePassword } from '../../../../../utils/api/user';

export default function ChangePasswordForm() {
	return (
		<Formik
			initialValues={{
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			}}
			validationSchema={Yup.object().shape({
				oldPassword: Yup.string().required('Password is required'),
				newPassword: Yup.string()
					.min(8, 'Password must be at least 8 characters')
					.required('Password is required'),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref('newPassword')], 'Passwords must match')
					.required('Password is required')
			})}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onSubmit={() => {}} // This is required for the validation to work
		>
			{({ isSubmitting, values, resetForm }) => (
				<Form className={formStyle.form}>
					<div className={formStyle.formGroup}>
						<label
							htmlFor='oldPassword'
							className={formStyle.formLabel}
						>
							Old password
						</label>
						<Field
							name='oldPassword'
							type='password'
							placeholder='Old password'
							className={formStyle.formInput}
						/>
						<ErrorMessage
							name='oldPassword'
							component='div'
							className={formStyle.formError}
						/>
					</div>
					<div className={formStyle.formGroup}>
						<label
							htmlFor='newPassword'
							className={formStyle.formLabel}
						>
							New password
						</label>
						<Field
							name='newPassword'
							type='password'
							placeholder='New password'
							className={formStyle.formInput}
						/>
						<ErrorMessage
							name='newPassword'
							component='div'
							className={formStyle.formError}
						/>
					</div>
					<div className={formStyle.formGroup}>
						<label
							htmlFor='confirmPassword'
							className={formStyle.formLabel}
						>
							Confirm password
						</label>
						<Field
							name='confirmPassword'
							type='password'
							placeholder='Confirm password'
							className={formStyle.formInput}
						/>
						<ErrorMessage
							name='confirmPassword'
							component='div'
							className={formStyle.formError}
						/>
					</div>
					<Button
						text='Change password'
						disabled={isSubmitting}
						onClick={async () => {
							const response = await updatePassword(values.oldPassword, values.newPassword);

							if (response.success) {
								toast.success('Password changed successfully');
								resetForm();
							} else {
								toast.error(response.message);
							}
						}}
						small
						theme='secondary'
					/>
				</Form>
			)}
		</Formik>
	);
}
