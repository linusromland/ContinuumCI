// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import Modal from '../../../../../components/Modal/Modal';
import Button from '../../../../../components/Button/Button';
import style from './ChangeEmailModal.module.scss';
import { updateEmail } from '../../../../../utils/api/user';
import { toast } from 'react-toastify';

export default function ChangeEmailModal({
	onClose,
	open,
	currentEmail
}: {
	onClose: (update: boolean) => void;
	open: boolean;
	currentEmail: string;
}) {
	return (
		<Modal
			title='Change Email'
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					email: currentEmail
				}}
				enableReinitialize
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Invalid email')
						.required('Email is required')
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={style.form}>
						<div className={style.formGroup}>
							<label
								htmlFor='email'
								className={style.formLabel}
							/>
							<Field
								name='email'
								type='text'
								placeholder='Email'
								className={style.formInput}
							/>
							<ErrorMessage
								name='email'
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text='Change email'
							disabled={isSubmitting}
							onClick={async () => {
								const response = await updateEmail(
									values.email
								);

								if (response.success) {
									onClose(true);
									toast.success(response.message);
								} else {
									toast.error(response.message);
								}
							}}
							secondary
							className={clsx(style.row2, style.col1)}
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
