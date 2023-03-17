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

export default function Users(): JSX.Element {
	const [users, setUsers] = useState([] as UserClass[]);

	useEffect(() => {
		(async () => {
			const response = await getUsers();
			console.log(response.data);
			setUsers(response.data as UserClass[]);
		})();
	}, []);

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
									'TODO',
									'TODO',
									<Button
										text='Edit'
										small
										secondary
										onClick={() => console.log('Edit user')}
									/>
								])}
								widget={false}
							/>
						</div>
					</Widget>
				</>
			)}
		</div>
	);
}
