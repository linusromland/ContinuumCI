// External dependencies
import dayjs from 'dayjs';
import { useState } from 'react';

// Internal dependencies
import style from './Header.module.scss';

export default function Header({ lastUpdated, onRefresh }: { lastUpdated: string; onRefresh: () => void }) {
	const [refreshing, setRefreshing] = useState(false as boolean);

	return (
		<header className={style.header}>
			<h1>Projects</h1>
			<div className={style.lastUpdated}>
				<p>
					Last updated: <span>{lastUpdated ? dayjs(lastUpdated).format('HH:mm:ss') : 'Never'}</span>
				</p>
				<button
					onClick={async () => {
						setRefreshing(true);
						await onRefresh();
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
		</header>
	);
}
