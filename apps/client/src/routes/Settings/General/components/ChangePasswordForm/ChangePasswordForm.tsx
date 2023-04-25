// External dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

// Internal dependencies
import formStyle from '../../../../../styles/formStyle.module.scss';
import Button from '../../../../../components/Button/Button';
import { updatePassword } from '../../../../../utils/api/user';
import useTranslations from '../../../../../i18n/translations';

export default function ChangePasswordForm() {
	const t = useTranslations();

	return (
		<Formik
			initialValues={{
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			}}
			validationSchema={Yup.object().shape({
				oldPassword: Yup.string().required(t.changePasswordModal.oldPassword.required),
				newPassword: Yup.string()
					.min(8, t.changePasswordModal.newPassword.minLength)
					.required(t.changePasswordModal.newPassword.required),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref('newPassword')], t.changePasswordModal.confirmPassword.match)
					.required(t.changePasswordModal.confirmPassword.required)
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
							{t.changePasswordModal.oldPassword.title}
						</label>
						<Field
							name='oldPassword'
							type='password'
							placeholder={t.changePasswordModal.oldPassword.title}
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
							{t.changePasswordModal.newPassword.title}
						</label>
						<Field
							name='newPassword'
							type='password'
							placeholder={t.changePasswordModal.newPassword.title}
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
							{t.changePasswordModal.confirmPassword.title}
						</label>
						<Field
							name='confirmPassword'
							type='password'
							placeholder={t.changePasswordModal.confirmPassword.title}
							className={formStyle.formInput}
						/>
						<ErrorMessage
							name='confirmPassword'
							component='div'
							className={formStyle.formError}
						/>
					</div>
					<Button
						text={t.changePasswordModal.submit}
						disabled={isSubmitting}
						onClick={async () => {
							const response = await updatePassword(values.oldPassword, values.newPassword);

							if (response.success) {
								toast.success(t.changePasswordModal.success);
								resetForm();
							} else {
								toast.error(t.changePasswordModal.error);
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
