// External dependencies
import dayjs from 'dayjs';

// Internal dependencies
import style from './Header.module.scss';

export default function Header({ lastUpdated, onRefresh }: { lastUpdated: string; onRefresh: () => void }) {
	return (
		<header className={style.header}>
			<h1>Projects</h1>
			<div className={style.lastUpdated}>
				<p>
					Last updated: <span>{lastUpdated ? dayjs(lastUpdated).format('HH:mm:ss') : 'Never'}</span>
				</p>
				<button onClick={onRefresh}>
					<img
						src='/icons/refresh.svg'
						alt='Refresh'
					/>
				</button>
			</div>
		</header>
	);
}
