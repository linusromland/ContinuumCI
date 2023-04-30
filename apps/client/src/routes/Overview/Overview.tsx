// External Dependencies
import { useEffect, useState } from 'react';
import { filesize } from 'filesize';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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
import useTranslations from '../../i18n/translations';
import { Loading } from '../../components/Loading/Loading';

// DayJS Plugins
dayjs.extend(utc);
dayjs.extend(customParseFormat);
const formatString = 'DD/MMM/YYYY:HH:mm:ss Z';

type filesizeType = {
	value: number;
	unit: string;
	symbol: string;
};

export default function Overview(): JSX.Element {
	const t = useTranslations();
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
		if (dataInterval) {
			clearTimeout(dataInterval);
		}

		if (window && window.location.pathname !== '/') return;

		const overviewResponse = await getOverview();

		if (overviewResponse.data) {
			setData(overviewResponse.data);
		}

		setDataInterval(setTimeout(getOverviewData, 1000 * 10));
	}

	async function getLogsData() {
		const logsResponse = await getLogs();

		if (logsResponse.success && logsResponse.data) {
			setLogs(logsResponse.data);
		}
	}

	if (!user || !data) return <Loading />;

	return (
		<div className={style.main}>
			<h1 className={style.title}>
				{t.overview.welcomeBack}, <span>{user}</span> 👋
			</h1>
			<div className={style.widgets}>
				<ApplicationWidget
					applicationsRunning={data.runningProjects || 0}
					applicationsTotal={data.projects || 0}
				/>
				<div className={style.widgetsRight}>
					<div className={style.smallWidgets}>
						<StatsWidget
							title={t.overview.cpuUsage.title}
							value={formatNumber(data.cpuUsage)}
							footer={`${t.overview.cpuUsage.on} ${data.cpuCores || 0} ${t.overview.cpuUsage.cores}`}
						/>
						<StatsWidget
							title={t.overview.memoryUsage.title}
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
							footer={`${t.overview.memoryUsage.ofTotal} ${filesize(data.memoryTotal || 0, {
								base: 10,
								round: 0
							})}`}
						/>
						<StatsWidget
							title={t.overview.networkUsage.title}
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
							footer={t.overview.networkUsage.sending}
						/>
						<StatsWidget
							title={t.overview.networkUsage.title}
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
							footer={t.overview.networkUsage.receiving}
						/>
					</div>
					<div className={style.smallWidgets}>
						<InfoWidget
							icon='/icons/projects_white.svg'
							value={data.projects?.toString() || '0'}
							label={t.sidebar.deployments.projects}
						/>
						<InfoWidget
							icon='/icons/containers_white.svg'
							value={data.containers?.toString() || '0'}
							label={t.sidebar.deployments.containers}
						/>
						<InfoWidget
							icon='/icons/image_white.svg'
							value={data.images?.toString() || '0'}
							label={t.overview.images}
						/>
					</div>
				</div>
			</div>
			<div className={style.table}>
				<h2 className={style.subtitle}>{t.overview.requestTable.title}</h2>
				<Table
					headers={[
						t.overview.requestTable.time,
						t.overview.requestTable.method,
						t.overview.requestTable.status,
						t.overview.requestTable.url,
						t.overview.requestTable.ip,
						t.overview.requestTable.size
					]}
					data={logs.map((log) => [
						dayjs.utc(log.time_local, formatString).format('YYYY-MM-DD HH:mm:ss'),
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
