// External dependencies
import { Link } from 'react-router-dom';

// Internal dependencies
import style from './ContainersTable.module.scss';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';

export default function ContainersTable({
	projectId
}: {
	projectId: string;
}): JSX.Element {
	return (
		<Widget>
			<div className={style.container}>
				<div className={style.title}>
					<img
						src='/icons/containers_black.svg'
						alt='Containers'
					/>
					<h1>Containers</h1>
				</div>
				<p className={style.text}>
					Here you can see all the containers that are running in this
					project.
				</p>
				<Table
					widget={false}
					headers={['Name', 'State', 'Created']}
					data={[
						[
							<Link to=''>velody_1-api:latest</Link>,
							'Running',
							'2021-05-01 12:00:00'
						]
					]}
				/>
			</div>
		</Widget>
	);
}
