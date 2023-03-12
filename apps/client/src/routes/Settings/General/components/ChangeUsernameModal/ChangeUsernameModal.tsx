// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import Modal from '../../../../../components/Modal/Modal';
import Button from '../../../../../components/Button/Button';
import style from './ChangeUsernameModal.module.scss';
import { updateUsername } from '../../../../../utils/api/user';
import { toast } from 'react-toastify';

export default function ChangeUsernameModal({
	onClose,
	open,
	currentUsername
}: {
	onClose: (update: boolean) => void;
	open: boolean;
	currentUsername: string;
}) {
	return (
		<Modal
			title='Change username'
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					username: currentUsername
				}}
				enableReinitialize
				validationSchema={Yup.object().shape({
					username: Yup.string().required('Username is required')
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={style.form}>
						<div className={style.formGroup}>
							<label
								htmlFor='username'
								className={style.formLabel}
							/>
							<Field
								name='username'
								type='text'
								placeholder='Username'
								className={style.formInput}
							/>
							<ErrorMessage
								name='username'
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text='Change username'
							disabled={isSubmitting}
							onClick={async () => {
								const response = await updateUsername(
									values.username
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
