// External dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Internal dependencies
import formStyle from '../../../../../styles/formStyle.module.scss';
import Modal from '../../../../../components/Modal/Modal';
import Button from '../../../../../components/Button/Button';
import { UserRoleEnum } from 'shared/src/enums';
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect';
import formatRole from '../../../../../utils/formatRole';
import { updateRole } from '../../../../../utils/api/user';

interface ChangeRoleModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
	currentRole: UserRoleEnum;
	username: string;
	userId: string;
}

export default function ChangeRoleModal({ onClose, open, currentRole, username, userId }: ChangeRoleModalProps) {
	return (
		<Modal
			title='Change Role'
			onClose={() => onClose(false)}
			open={open}
		>
			<p>This will change the role of {username}.</p>
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
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='role'
								className={formStyle.formLabel}
							>
								Role
							</label>
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
								className={formStyle.formError}
							/>
						</div>
						<Button
							text='Change role'
							disabled={isSubmitting}
							onClick={async () => {
								const response = await updateRole(userId, values.role.value);

								if (response.success) {
									toast.success(`Successfully changed role of ${username}`);
									onClose(true);
								} else {
									toast.error(`Failed to change role of ${username}`);
									onClose(false);
								}
							}}
							theme='secondary'
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
