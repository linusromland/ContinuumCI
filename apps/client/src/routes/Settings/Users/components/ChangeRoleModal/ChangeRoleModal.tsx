// External dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './ChangeRoleModal.module.scss';
import formStyle from '../../../../../styles/formStyle.module.scss';
import Modal from '../../../../../components/Modal/Modal';
import Button from '../../../../../components/Button/Button';
import { UserRoleEnum } from 'shared/src/enums';
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect';
import formatRole from '../../../../../utils/formatRole';
import { updateRole } from '../../../../../utils/api/user';
import useTranslations from '../../../../../i18n/translations';

interface ChangeRoleModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
	currentRole: UserRoleEnum;
	userId: string;
}

export default function ChangeRoleModal({ onClose, open, currentRole, userId }: ChangeRoleModalProps) {
	const t = useTranslations();

	return (
		<Modal
			title={t.changeRoleModal.title}
			onClose={() => onClose(false)}
			open={open}
		>
			<p className={style.text}>{t.changeRoleModal.description}</p>
			<Formik
				initialValues={{
					role: {
						value: currentRole,
						label: formatRole(currentRole, t)
					}
				}}
				enableReinitialize
				validationSchema={Yup.object().shape({
					role: Yup.object().shape({
						value: Yup.string().required(t.changeRoleModal.schema.roleRequired),
						label: Yup.string().required(t.changeRoleModal.schema.roleRequired)
					})
				})}
				onSubmit={async (values) => {
					const response = await updateRole(userId, values.role.value);

					if (response.success) {
						toast.success(t.changeRoleModal.success);
						onClose(true);
					} else {
						toast.error(t.changeRoleModal.error);
						onClose(false);
					}
				}}
			>
				{({ isSubmitting, dirty }) => (
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='role'
								className={formStyle.formLabel}
							>
								{t.changeRoleModal.role}
							</label>
							<Field
								name='role'
								component={CustomSelect}
								options={[
									{
										value: UserRoleEnum.ADMIN,
										label: t.changeRoleModal.admin
									},
									{
										value: UserRoleEnum.USER,
										label: t.changeRoleModal.user
									}
								]}
								placeholder={t.changeRoleModal.role}
							/>
							<ErrorMessage
								name='role'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<Button
							text={t.changeRoleModal.submit}
							disabled={isSubmitting || !dirty}
							type='submit'
							theme='secondary'
							icon='/icons/save.svg'
							loading={isSubmitting}
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
