// Internal dependencies
import style from './AccessControlTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import { ProjectClass, UserClass } from 'shared/src/classes';
import { ProjectRoleEnum } from 'shared/src/enums';
import formatProjectRole from '../../../../utils/formatProjectRole';
import useTranslations from '../../../../i18n/translations';

interface AccessControlTableProps {
	project: ProjectClass;
}

export default function AccessControlTable({ project }: AccessControlTableProps): JSX.Element {
	const t = useTranslations();

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
								text={t.accessControl.remove}
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
						text={t.accessControl.addNew}
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
