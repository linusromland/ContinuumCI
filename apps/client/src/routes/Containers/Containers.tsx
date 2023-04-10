// External dependencies
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Internal dependencies
import style from './Containers.module.scss';
import Widget from '../../components/Widget/Widget';
import Table from '../../components/Table/Table';
import { getContainers } from '../../utils/api/containers';
import { ContainerType } from 'shared/src/types';

export default function Containers(): JSX.Element {
	const [containers, setContainers] = useState([] as ContainerType[]);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		const response = await getContainers([]);
		if (response.success && response.data) {
			setContainers(response.data);
		}
	}

	return (
		<div className={style.main}>
			{containers && containers.length > 0 && (
				<>
					<h1 className={style.title}>Containers</h1>
					<Widget contentClass={style.contentClass}>
						<div className={style.container}>
							<h2 className={style.subtitle}>Available containers</h2>
							<Table
								widget={false}
								headers={['Name', 'State', 'Created']}
								data={containers.map((container) => [
									<Link to={`/containers/${container.id}`}>{container.name}</Link>,
									container.state,
									container.created ? dayjs(container.created * 1000).format('YYYY-MM-DD HH:mm') : '-'
								])}
							/>
						</div>
					</Widget>
				</>
			)}
			{containers && containers.length === 0 && (
				<div className={style.container}>
					<h2 className={style.subtitle}>Containers</h2>
					<p>No containers found.</p>
				</div>
			)}
		</div>
	);
}
