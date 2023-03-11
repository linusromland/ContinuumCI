// External Dependencies
import { useEffect, useState } from 'react';

// Internal Dependencies
import style from './Overview.module.scss';
import { getUser } from '../../utils/api/user';
import { UserClass } from 'shared/src/classes';
import StatsWidget from './components/StatsWidget/StatsWidget';
import ApplicationWidget from './components/ApplicationWidget/ApplicationWidget';
import InfoWidget from './components/InfoWidget/InfoWidget';
import Table from '../../components/Table/Table';

export default function Overview(): JSX.Element {
	const [user, setUser] = useState('null');

	useEffect(() => {
		(async () => {
			const userResponse = await getUser();
			const user = userResponse.data as UserClass;

			if (user && user.username) {
				setUser(user.username);
			}
		})();
	}, []);

	return (
		<div className={style.main}>
			<h1 className={style.title}>
				Welcome back, <span>{user}</span> 👋
			</h1>
			<div className={style.widgets}>
				<ApplicationWidget
					applicationsRunning={4}
					applicationsTotal={4}
				/>
				<div>
					<div className={style.smallWidgets}>
						<StatsWidget
							title='CPU Usage'
							value={85}
							footer='on 4 cores'
						/>
						<StatsWidget
							title='Memory Usage'
							value={4012}
							maxValue={4096}
							unit='MB'
							footer='out of 4096 MB'
						/>
						<StatsWidget
							title='Network Usage'
							value={1.2}
							unit='Mbps'
							valueRange={undefined}
							footer='Sending'
						/>
						<StatsWidget
							title='Network Usage'
							value={3.4}
							unit='Mbps'
							valueRange={undefined}
							footer='Receiving'
						/>
					</div>
					<div className={style.smallWidgets}>
						<InfoWidget
							icon='/icons/applications_white.svg'
							value='9'
							label='Applications'
						/>
						<InfoWidget
							icon='/icons/containers_white.svg'
							value='4'
							label='Containers'
						/>
						<InfoWidget
							icon='/icons/image_white.svg'
							value='12'
							label='Images'
						/>
					</div>
				</div>
			</div>
			<div className={style.table}>
				<h2 className={style.subtitle}>10 latests requests</h2>
				<Table
					headers={[
						'Time',
						'Method',
						'Status',
						'URL',
						'IP',
						'Project'
					]}
					data={[
						[
							'2021-03-01 12:00:00',
							'GET',
							'200 OK',
							'https://romland.dev/api/user',
							'192.168.1.1',
							'Romland.dev'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							'404 Not Found',
							'https://romland.dev/api/setup',
							'192.168.1.1',
							'Romland.dev'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							"418 I'm a teapot",
							'https://linusromland.com/api/projects',
							'192.168.1.1',
							'linusromland.com'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							"418 I'm a teapot",
							'https://linusromland.com/api/projects',
							'192.168.1.1',
							'linusromland.com'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							"418 I'm a teapot",
							'https://linusromland.com/api/projects',
							'192.168.1.1',
							'linusromland.com'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							'200 OK',
							'https://romland.dev/api/user',
							'192.168.1.1',
							'Romland.dev'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							'404 Not Found',
							'https://romland.dev/api/setup',
							'192.168.1.1',
							'Romland.dev'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							"418 I'm a teapot",
							'https://linusromland.com/api/projects',
							'192.168.1.1',
							'linusromland.com'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							"418 I'm a teapot",
							'https://linusromland.com/api/projects',
							'192.168.1.1',
							'linusromland.com'
						],
						[
							'2021-03-01 12:00:00',
							'GET',
							"418 I'm a teapot",
							'https://linusromland.com/api/projects',
							'192.168.1.1',
							'linusromland.com'
						]
					]}
				/>
			</div>
		</div>
	);
}
