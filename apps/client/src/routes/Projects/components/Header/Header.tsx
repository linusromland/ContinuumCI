// External dependencies
import dayjs from 'dayjs';
import { useState } from 'react';

// Internal dependencies
import useTranslations from '../../../../i18n/translations';
import style from './Header.module.scss';

interface HeaderProps {
	lastUpdated: string;
	onRefresh: () => void;
}

export default function Header({ lastUpdated, onRefresh }: HeaderProps) {
	const t = useTranslations();
	const [refreshing, setRefreshing] = useState(false as boolean);

	return (
		<header className={style.header}>
			<h1>{t.projects.header.title}</h1>
			<div className={style.lastUpdated}>
				<p>
					{t.projects.header.lastUpdated}:{' '}
					<span>{lastUpdated ? dayjs(lastUpdated).format('HH:mm:ss') : 'Never'}</span>
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
