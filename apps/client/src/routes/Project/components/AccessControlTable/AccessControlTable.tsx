// External dependencies
import { useState } from 'react';
import { FormikValues } from 'formik';

// Internal dependencies
import style from './AccessControlTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import { ProjectClass, UserClass } from 'shared/src/classes';
import { ProjectRoleEnum } from 'shared/src/enums';
import formatProjectRole from '../../../../utils/formatProjectRole';
import useTranslations from '../../../../i18n/translations';
import AddUserModal from './components/AddUserModal/AddUserModal';

interface AccessControlTableProps {
	project: ProjectClass;
	submit: (values: FormikValues, remove: boolean) => void;
}

export default function AccessControlTable({ project, submit }: AccessControlTableProps): JSX.Element {
	const t = useTranslations();

	const [open, setOpen] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState('');

	return (
		<>
			<Widget>
				<div className={style.container}>
					<div className={style.title}>
						<img
							src='/icons/users_black.svg'
							alt='Enviroment Varisables'
						/>
						<h1>{t.accessControl.title}</h1>
					</div>
					<p className={style.text}>{t.accessControl.description}</p>
					<Table
						headers={[
							t.accessControl.username,
							t.accessControl.email,
							t.accessControl.role,
							t.accessControl.actions
						]}
						data={(project.permissions || []).map((user) => [
							(user.user as UserClass).username,
							(user.user as UserClass).email,
							t.accessControl.projectStatus[formatProjectRole(user.role)],
							<Button
								text={
									confirmDelete === (user.user as UserClass)._id.toString()
										? t.accessControl.confirmRemove
										: t.accessControl.remove
								}
								small
								theme='error'
								onClick={() => {
									if (confirmDelete === (user.user as UserClass)._id.toString()) {
										submit(
											{
												user: (user.user as UserClass)._id.toString(),
												role: user.role
											},
											true
										);
										setConfirmDelete('');
									} else {
										console.log((user.user as UserClass)._id.toString());
										setConfirmDelete((user.user as UserClass)._id.toString());
									}
								}}
								disabled={user.role === ProjectRoleEnum.OWNER}
							/>
						])}
						widget={false}
					/>
					<Button
						text={t.accessControl.addNew}
						theme='primary'
						onClick={() => setOpen(true)}
						small
					/>
				</div>
			</Widget>

			<AddUserModal
				existingUsers={(project.permissions || []).map((user) => (user.user as UserClass)._id.toString())}
				onClose={() => setOpen(false)}
				submit={async (values) => {
					submit(values, false);
					setOpen(false);
				}}
				open={open}
			/>
		</>
	);
}
