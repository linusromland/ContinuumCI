// External Dependencies
import { useEffect, useState } from 'react';
import { filesize } from 'filesize';

// Internal Dependencies
import style from './Overview.module.scss';
import { getUser } from '../../utils/api/user';
import StatsWidget from './components/StatsWidget/StatsWidget';
import ApplicationWidget from './components/ApplicationWidget/ApplicationWidget';
import InfoWidget from './components/InfoWidget/InfoWidget';
import Table from '../../components/Table/Table';
import { NginxLogsType, OverviewType } from 'shared/src/types';
import { getOverview } from '../../utils/api/overview';
import { formatNumber } from '../../utils/formatNumber';
import { getLogs } from '../../utils/api/nginx/logs';

type filesizeType = {
	value: number;
	unit: string;
	symbol: string;
};

export default function Overview(): JSX.Element {
	const [user, setUser] = useState('');
	const [data, setData] = useState({} as OverviewType);
	const [logs, setLogs] = useState([] as NginxLogsType[]);
	const [dataInterval, setDataInterval] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		(async () => {
			getOverviewData();
			getLogsData();

			const userResponse = await getUser();
			if (userResponse.success && userResponse.data) {
				const user = userResponse.data;
				if (user && user.username) {
					setUser(user.username);
				}
			}
		})();
	}, []);

	async function getOverviewData() {
		const overviewResponse = await getOverview();

		if (overviewResponse.data) {
			setData(overviewResponse.data);
		}

		if (dataInterval) {
			clearTimeout(dataInterval);
		}

		setDataInterval(setTimeout(getOverviewData, 1000 * 10));
	}

	async function getLogsData() {
		const logsResponse = await getLogs();

		if (logsResponse.success && logsResponse.data) {
			setLogs(logsResponse.data);
		}
	}

	return (
		<div className={style.main}>
			<h1 className={style.title}>
				Welcome back, <span>{user}</span> 👋
			</h1>
			<div className={style.widgets}>
				<ApplicationWidget
					applicationsRunning={data.runningProjects || 0}
					applicationsTotal={data.projects || 0}
				/>
				<div className={style.widgetsRight}>
					<div className={style.smallWidgets}>
						<StatsWidget
							title='CPU Usage'
							value={formatNumber(data.cpuUsage)}
							footer={`on ${data.cpuCores || 0} cores`}
						/>
						<StatsWidget
							title='Memory Usage'
							value={
								(
									filesize(data.memoryUsage || 0, {
										base: 10,
										round: 2,
										output: 'object'
									}) as filesizeType
								).value
							}
							maxValue={data.memoryTotal}
							unit={
								(
									filesize(data.memoryUsage || 0, {
										base: 10,
										round: 0,
										output: 'object'
									}) as filesizeType
								).unit
							}
							footer={`of ${filesize(data.memoryTotal || 0, {
								base: 10,
								round: 0
							})}`}
						/>
						<StatsWidget
							title='Network Usage'
							value={
								(
									filesize(data.networkSending || 0, {
										base: 10,
										round: 2,
										output: 'object'
									}) as filesizeType
								).value
							}
							unit={
								(
									filesize(data.networkSending || 0, {
										base: 10,
										round: 0,
										output: 'object'
									}) as filesizeType
								).symbol + '/s'
							}
							valueRange={undefined}
							footer='Sending'
						/>
						<StatsWidget
							title='Network Usage'
							value={
								(
									filesize(data.networkReceiving || 0, {
										base: 10,
										round: 2,
										output: 'object'
									}) as filesizeType
								).value
							}
							unit={
								(
									filesize(data.networkReceiving || 0, {
										base: 10,
										round: 0,
										output: 'object'
									}) as filesizeType
								).symbol + '/s'
							}
							valueRange={undefined}
							footer='Receiving'
						/>
					</div>
					<div className={style.smallWidgets}>
						<InfoWidget
							icon='/icons/projects_white.svg'
							value={data.projects?.toString() || '0'}
							label='Projects'
						/>
						<InfoWidget
							icon='/icons/containers_white.svg'
							value={data.containers?.toString() || '0'}
							label='Containers'
						/>
						<InfoWidget
							icon='/icons/image_white.svg'
							value={data.images?.toString() || '0'}
							label='Images'
						/>
					</div>
				</div>
			</div>
			<div className={style.table}>
				<h2 className={style.subtitle}>10 latests requests</h2>
				<Table
					headers={['Time', 'Method', 'Status', 'URL', 'IP', 'Size (bytes)']}
					data={logs.map((log) => [
						log.time_local,
						log.request_method,
						log.status.toString(),
						log.request_url,
						log.remote_address,
						log.body_bytes_sent.toString()
					])}
				/>
			</div>
		</div>
	);
}
