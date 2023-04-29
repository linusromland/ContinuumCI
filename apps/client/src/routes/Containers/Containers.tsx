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
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Loading } from '../../components/Loading/Loading';
import useTranslations from '../../i18n/translations';

export default function Containers(): JSX.Element {
	const t = useTranslations();
	const [containers, setContainers] = useState([] as ContainerType[]);
	const [dataReady, setDataReady] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		setDataReady(false);
		const response = await getContainers([]);
		if (response.success && response.data) {
			setContainers(response.data);
		}
		setDataReady(true);
	}

	if (!dataReady) return <Loading />;

	return (
		<main className={style.main}>
			<Breadcrumbs
				path={[
					{
						name: t.containers.title,
						link: '/conatiners'
					}
				]}
			/>
			<div className={style.content}>
				{containers && containers.length > 0 && (
					<>
						<h1 className={style.title}>{t.containers.title}</h1>
						<Widget contentClass={style.contentClass}>
							<div className={style.container}>
								<h2 className={style.subtitle}>{t.containers.availableContainers}</h2>
								<Table
									widget={false}
									headers={[t.containers.name, t.containers.state, t.containers.created]}
									data={containers.map((container) => [
										<Link
											to={`/containers/${container.id}`}
											className={style.link}
										>
											{container.name}
										</Link>,
										container.state,
										container.created
											? dayjs(container.created * 1000).format('YYYY-MM-DD HH:mm')
											: '-'
									])}
								/>
							</div>
						</Widget>
					</>
				)}
				{containers && containers.length === 0 && (
					<>
						<h2 className={style.title}>{t.containers.title}</h2>
						<p>{t.containers.noContainersFound}</p>
					</>
				)}
			</div>
		</main>
	);
}
