// External dependencies
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import style from './ProjectCard.module.scss';

export default function ProjectCard({
	project,
	onClick
}: {
	project: ProjectClass;
	onClick: () => void;
}): JSX.Element {
	const [icon, setIcon] = useState('git');

	useEffect(() => {
		if (!project || !project.gitUrl) return;

		if (project.gitUrl.includes('github')) return setIcon('github');
		if (project.gitUrl.includes('gitlab')) return setIcon('gitlab');
	}, [project]);

	return (
		<div
			className={style.container}
			onClick={onClick}
		>
			<div className={style.topBar}>
				<img
					className={style.icon}
					src={`/icons/${icon}.svg`}
					alt={icon + ' icon'}
				/>
				<h1>{project.name}</h1>
			</div>
			<div className={style.content}>
				<p>
					Status: <span>Everything operating normally!</span>
				</p>
				<p>
					Sync status: <span>Out of sync</span>
				</p>
				<p>
					Repository: <a>{project.gitUrl}</a>
				</p>
				<p>
					URL: <a>https://romland.dev</a>
				</p>
				<p>
					Last updated:{' '}
					<span>
						{project.updatedAt
							? dayjs(project.updatedAt).format(
									'YYYY-MM-DD HH:mm:ss'
							  )
							: 'Never'}
					</span>
				</p>
			</div>
		</div>
	);
}
