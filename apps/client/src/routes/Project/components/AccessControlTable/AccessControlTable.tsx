// Internal dependencies
import style from './AccessControlTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import { ProjectClass, UserClass } from 'shared/src/classes';
import { ProjectRoleEnum } from 'shared/src/enums';
import formatProjectRole from '../../../../utils/formatProjectRole';

interface AccessControlTableProps {
	project: ProjectClass;
}

export default function AccessControlTable({ project }: AccessControlTableProps): JSX.Element {
	return (
		<>
			<Widget>
				<div className={style.container}>
					<div className={style.title}>
						<img
							src='/icons/users_black.svg'
							alt='Enviroment Varisables'
						/>
						<h1>Access Control</h1>
					</div>
					<p className={style.text}>
						The root user & all administrators always have access to this application.
					</p>
					<Table
						headers={['Username', 'E-mail', 'Role', 'Actions']}
						data={(project.permissions || []).map((user) => [
							(user.user as UserClass).username,
							(user.user as UserClass).email,
							formatProjectRole(user.role),
							<Button
								text='Remove'
								small
								theme='danger'
								onClick={() => {
									console.log('remove');
								}}
								disabled={user.role === ProjectRoleEnum.OWNER}
							/>
						])}
						widget={false}
					/>
					<Button
						text='Add new'
						theme='primary'
						onClick={() => {
							console.log('add new');
						}}
						small
					/>
				</div>
			</Widget>
		</>
	);
}
