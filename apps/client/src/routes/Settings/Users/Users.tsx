// External dependencies
import { useState, useEffect } from 'react';

// Internal dependencies
import style from './Users.module.scss';
import Widget from '../../../components/Widget/Widget';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Table from '../../../components/Table/Table';
import Button from '../../../components/Button/Button';
import formatRole from '../../../utils/formatRole';
import { getUsers } from '../../../utils/api/user';
import { UserClass } from 'shared/src/classes';
import { UserRoleEnum } from 'shared/src/enums';
import ChangeRoleModal from './components/ChangeRoleModal/ChangeRoleModal';
import useTranslations from '../../../i18n/translations';

export default function Users(): JSX.Element {
	const t = useTranslations();

	const [users, setUsers] = useState([] as UserClass[]);
	const [selectedUser, setSelectedUser] = useState(null as UserClass | null);
	const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		const response = await getUsers();
		setUsers(response.data as UserClass[]);
	}

	return (
		<div className={style.main}>
			<Breadcrumbs path={[{ name: t.settings.title }, { name: t.userSettings.users }]} />
			{users && users.length > 0 && (
				<>
					<h1 className={style.title}>{t.userSettings.title}</h1>
					<Widget>
						<div className={style.container}>
							<h2 className={style.subtitle}>{t.userSettings.users}</h2>
							<Table
								headers={[
									t.userSettings.accountType,
									t.userSettings.username,
									t.userSettings.email,
									t.userSettings.lastLogin,
									t.userSettings.lastIp,
									t.userSettings.actions
								]}
								data={users.map((user) => [
									formatRole(user.role, t),
									user.username,
									user.email,
									user.lastLogin ? new Date(user.lastLogin).toLocaleString() : t.userSettings.never,
									user.lastIp ? user.lastIp : t.userSettings.never,
									<Button
										text={t.userSettings.edit}
										small
										theme='secondary'
										onClick={() => {
											setSelectedUser(user);
											setShowChangeRoleModal(true);
										}}
										disabled={user.role === UserRoleEnum.ROOT}
									/>
								])}
								widget={false}
							/>
						</div>
					</Widget>
				</>
			)}
			{users && users.length === 0 && (
				<div className={style.container}>
					<h2 className={style.subtitle}>{t.userSettings.users}</h2>
					<p>{t.userSettings.noUsersFound}</p>
				</div>
			)}
			<ChangeRoleModal
				open={showChangeRoleModal}
				onClose={(update) => {
					setShowChangeRoleModal(false);

					if (update) {
						getData();
					}
				}}
				userId={selectedUser?._id || ''}
				currentRole={selectedUser?.role || UserRoleEnum.USER}
			/>
		</div>
	);
}
