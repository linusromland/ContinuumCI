// External dependencies
import { createRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

// Internal dependencies
import style from './Container.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Loading } from '../../components/Loading/Loading';
import { ContainerTypeWithLogs } from 'shared/src/types';
import { getContainerWithLogs } from '../../utils/api/containers';
import Widget from '../../components/Widget/Widget';

export default function Container() {
	const { containerId } = useParams();
	const navigate = useNavigate();

	const logsContainer = createRef<HTMLDivElement>();

	const [container, setContainer] = useState({} as ContainerTypeWithLogs);
	const [lastUpdated, setLastUpdated] = useState<Date>();
	const [refreshing, setRefreshing] = useState(false);

	async function getData() {
		if (!containerId) return console.error('No projectId provided');

		const response = await getContainerWithLogs(containerId);
		if (response.success && response.data) {
			setContainer(response.data);
			setLastUpdated(new Date());
		} else {
			navigate('/containers');
			toast.error(response.message);
		}
	}

	// Scroll to bottom of logs
	useEffect(() => {
		if (logsContainer.current) {
			logsContainer.current.scrollTop = logsContainer.current.scrollHeight;
		}
	}, [container.logs]);

	useEffect(() => {
		getData();
	}, []);

	if (!container) return <Loading />;

	return (
		<>
			<main className={style.main}>
				<Breadcrumbs
					path={[
						{
							name: 'Containers',
							link: '/containers'
						},
						{
							name: container.name
						}
					]}
				/>
				<div className={style.content}>
					<h1 className={style.title}>Container details</h1>
					<div className={style.infoContainer}>
						<p>Name:</p>
						<p>{container.name}</p>
					</div>
					<div className={style.infoContainer}>
						<p>Id:</p>
						<p>{container.id}</p>
					</div>
					<div className={style.infoContainer}>
						<p>State:</p>
						<p>{container.state}</p>
					</div>
					<div className={style.infoContainer}>
						<p>Created:</p>
						<p>{container.created ? dayjs(container.created).format('YYYY-MM-DD HH:mm') : '-'}</p>
					</div>
					<div className={style.logsContainer}>
						<Widget>
							<>
								<div className={style.logHeader}>
									<p className={style.title}>Logs</p>
									<div className={style.lastUpdated}>
										<p>
											Last updated:{' '}
											<span>{lastUpdated ? dayjs(lastUpdated).format('HH:mm:ss') : 'Never'}</span>
										</p>
										<button
											onClick={async () => {
												setRefreshing(true);
												await getData();
												setRefreshing(false);
											}}
										>
											<img
												className={refreshing ? style.refreshing : ''}
												src='/icons/refresh.svg'
												alt='Refresh'
											/>
										</button>
									</div>
								</div>
								{!container.logs ? (
									<p className={style.noLogs}>No logs available</p>
								) : (
									<div
										className={style.logs}
										ref={logsContainer}
									>
										{container.logs
											.split('\n')
											.filter((log) => log !== '')
											.map((log, index) => (
												<p key={index}>{log}</p>
											))}
									</div>
								)}
							</>
						</Widget>
					</div>
				</div>
			</main>
		</>
	);
}
