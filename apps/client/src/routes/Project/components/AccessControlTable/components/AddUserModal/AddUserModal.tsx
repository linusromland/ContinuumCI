// External dependencies
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

// Internal dependencies
import formStyle from '../../../../../../styles/formStyle.module.scss';
import useTranslations from '../../../../../../i18n/translations';
import Modal from '../../../../../../components/Modal/Modal';
import CustomSelect from '../../../../../../components/CustomSelect/CustomSelect';
import Button from '../../../../../../components/Button/Button';
import { getUsers } from '../../../../../../utils/api/user';

interface AddUserModalProps {
	existingUsers: string[];
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
}

export default function AddUserModal({ existingUsers, onClose, submit, open }: AddUserModalProps) {
	const t = useTranslations();
	const [users, setUsers] = useState([] as { label: string; value: string }[]);

	async function getData() {
		const response = await getUsers();

		if (response.success && response.data) {
			setUsers(
				response.data
					.filter((user) => !existingUsers.includes(user._id))
					.map((user) => ({
						label: user.username,
						value: user._id
					}))
			);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<Modal
			title={t.addUserModal.title}
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					user: null as {
						label: string;
						value: string;
					} | null,
					role: null as {
						label: string;
						value: string;
					} | null
				}}
				enableReinitialize
				validationSchema={Yup.object({
					user: Yup.object({
						label: Yup.string().required(t.addUserModal.schema.user.required).nonNullable(),
						value: Yup.string().required(t.addUserModal.schema.user.required).nonNullable()
					}),
					role: Yup.object({
						label: Yup.string().required(t.addUserModal.schema.role.required),
						value: Yup.string().required(t.addUserModal.schema.role.required)
					})
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='user'
								className={formStyle.formLabel}
							>
								{t.addUserModal.user}
							</label>
							<Field
								name='user'
								component={CustomSelect}
								options={users}
								placeholder={t.addUserModal.user}
							/>
							<ErrorMessage
								name='name'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='role'
								className={formStyle.formLabel}
							>
								{t.addUserModal.role}
							</label>
							<Field
								name='role'
								component={CustomSelect}
								options={[
									{
										value: 'developer',
										label: t.accessControl.projectStatus.developer
									},
									{
										value: 'viewer',
										label: t.accessControl.projectStatus.viewer
									}
								]}
								placeholder={t.addUserModal.role}
							/>
							<ErrorMessage
								name='role'
								component='div'
								className={formStyle.formError}
							/>
						</div>

						<Button
							text={t.addUserModal.add}
							disabled={isSubmitting}
							onClick={() => {
								if (!values.user || !values.role) return;

								submit({
									user: values.user.value,
									role: values.role.value
								});
							}}
							theme='secondary'
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
