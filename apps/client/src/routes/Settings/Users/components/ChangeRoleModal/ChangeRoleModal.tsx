// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Internal dependencies
import Modal from '../../../../../components/Modal/Modal';
import Button from '../../../../../components/Button/Button';
import style from './ChangeRoleModal.module.scss';
import { UserRoleEnum } from 'shared/src/enums';
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect';
import formatRole from '../../../../../utils/formatRole';
import { updateRole } from '../../../../../utils/api/user';

export default function ChangeRoleModal({
	onClose,
	open,
	currentRole,
	username,
	userId
}: {
	onClose: (update: boolean) => void;
	open: boolean;
	currentRole: UserRoleEnum;
	username: string;
	userId: string;
}) {
	return (
		<Modal
			title='Change Role'
			onClose={() => onClose(false)}
			open={open}
		>
			<p className={style.description}>
				This will change the role of {username}.
			</p>
			<Formik
				initialValues={{
					role: {
						value: currentRole,
						label: formatRole(currentRole)
					}
				}}
				enableReinitialize
				validationSchema={Yup.object().shape({
					role: Yup.object().shape({
						value: Yup.string().required('Role is required'),
						label: Yup.string().required('Role is required')
					})
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={style.form}>
						<div className={style.formGroup}>
							<label
								htmlFor='role'
								className={style.formLabel}
							/>
							<Field
								name='role'
								component={CustomSelect}
								options={[
									{
										value: UserRoleEnum.ADMIN,
										label: 'Admin'
									},
									{
										value: UserRoleEnum.USER,
										label: 'User'
									}
								]}
								placeholder='Role'
							/>
							<ErrorMessage
								name='role'
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text='Change role'
							disabled={isSubmitting}
							onClick={async () => {
								const response = await updateRole(
									userId,
									values.role.value
								);

								if (response.success) {
									toast.success(
										`Successfully changed role of ${username}`
									);
									onClose(true);
								} else {
									toast.error(
										`Failed to change role of ${username}`
									);
									onClose(false);
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
