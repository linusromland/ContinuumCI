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

export default function Users(): JSX.Element {
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
			<Breadcrumbs path={[{ name: 'Settings' }, { name: 'Users' }]} />
			{users && users.length > 0 && (
				<>
					<h1 className={style.title}>User Settings</h1>
					<Widget>
						<div className={style.container}>
							<h2 className={style.subtitle}>Users</h2>
							<Table
								headers={[
									'Account Type',
									'Username',
									'E-mail',
									'Last Login',
									'Last IP',
									'Actions'
								]}
								data={users.map((user) => [
									formatRole(user.role),
									user.username,
									user.email,
									user.lastLogin
										? new Date(
												user.lastLogin
										  ).toLocaleString()
										: 'Never',
									user.lastIp ? user.lastIp : 'Never',
									<Button
										text='Edit'
										small
										theme='secondary'
										onClick={() => {
											setSelectedUser(user);
											setShowChangeRoleModal(true);
										}}
										disabled={
											user.role === UserRoleEnum.ROOT
										}
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
					<h2 className={style.subtitle}>Users</h2>
					<p>No users found.</p>
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
				username={selectedUser?.username || ''}
				userId={selectedUser?._id || ''}
				currentRole={selectedUser?.role || UserRoleEnum.USER}
			/>
		</div>
	);
}
