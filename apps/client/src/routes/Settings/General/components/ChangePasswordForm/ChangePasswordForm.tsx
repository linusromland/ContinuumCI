// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

// Internal dependencies
import Button from '../../../../../components/Button/Button';
import { updatePassword } from '../../../../../utils/api/user';
import style from './ChangePasswordForm.module.scss';

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
				<Form className={style.form}>
					<div className={style.formGroup}>
						<label
							htmlFor='oldPassword'
							className={style.formLabel}
						/>
						<Field
							name='oldPassword'
							type='password'
							placeholder='Old password'
							className={style.formInput}
						/>
						<ErrorMessage
							name='oldPassword'
							component='div'
							className={style.formError}
						/>
					</div>
					<div className={style.formGroup}>
						<label
							htmlFor='newPassword'
							className={style.formLabel}
						/>
						<Field
							name='newPassword'
							type='password'
							placeholder='New password'
							className={style.formInput}
						/>
						<ErrorMessage
							name='newPassword'
							component='div'
							className={style.formError}
						/>
					</div>
					<div className={style.formGroup}>
						<label
							htmlFor='confirmPassword'
							className={style.formLabel}
						/>
						<Field
							name='confirmPassword'
							type='password'
							placeholder='Confirm password'
							className={style.formInput}
						/>
						<ErrorMessage
							name='confirmPassword'
							component='div'
							className={style.formError}
						/>
					</div>
					<Button
						text='Change password'
						disabled={isSubmitting}
						onClick={async () => {
							const response = await updatePassword(
								values.oldPassword,
								values.newPassword
							);

							if (response.success) {
								toast.success('Password changed successfully');
								resetForm();
							} else {
								toast.error(response.message);
							}
						}}
						small
						theme='secondary'
						className={clsx(style.row2, style.col1)}
					/>
				</Form>
			)}
		</Formik>
	);
}
