// External dependencies
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// Internal dependencies
import style from './ContainersTable.module.scss';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import { ContainerType } from 'shared/src/types';
import { getContainers } from '../../../../utils/api/containers';
import useTranslations from '../../../../i18n/translations';

interface ContainersTableProps {
	projectId: string;
}

export default function ContainersTable({ projectId }: ContainersTableProps): JSX.Element {
	const t = useTranslations();
	const [containers, setContainers] = useState([] as ContainerType[]);

	async function getData() {
		const response = await getContainers([projectId]);
		if (response.success && response.data) {
			setContainers(response.data);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<Widget>
			<div className={style.container}>
				<div className={style.title}>
					<img
						src='/icons/containers_black.svg'
						alt='Containers'
					/>
					<h1>{t.containersTable.title}</h1>
				</div>
				<p className={style.text}>{t.containersTable.description}</p>
				<Table
					widget={false}
					headers={[t.containersTable.name, t.containersTable.state, t.containersTable.created]}
					data={containers.map((container) => [
						<Link to={`/containers/${container.id}`}>{container.name}</Link>,
						container.state,
						container.created ? dayjs(container.created * 1000).format('YYYY-MM-DD HH:mm') : '-'
					])}
				/>
			</div>
		</Widget>
	);
}
