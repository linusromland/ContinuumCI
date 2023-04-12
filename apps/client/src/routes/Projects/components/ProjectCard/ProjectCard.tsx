// External dependencies
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import style from './ProjectCard.module.scss';
import { ProjectDeploymentStatus } from 'shared/src/enums';

interface ProjectCardProps {
	project: ProjectClass;
	onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps): JSX.Element {
	const [icon, setIcon] = useState('git');
	const [status, setStatus] = useState('success');

	useEffect(() => {
		if (!project || !project.gitUrl) return;

		if (project.deploymentStatus === ProjectDeploymentStatus.RUNNING) setStatus('success');
		else if (project.deploymentStatus === ProjectDeploymentStatus.PARTIALLY_RUNNING) setStatus('warning');
		else setStatus('error');

		if (project.gitUrl.includes('github')) return setIcon('github');
		if (project.gitUrl.includes('gitlab')) return setIcon('gitlab');
	}, [project]);

	return (
		<div
			className={clsx(style.container, style[status])}
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
					Status: <span>{project.deploymentStatus}</span>
				</p>
				<p>
					Sync status: <span>{project.syncStatus}</span>
				</p>
				<p>
					Repository: <a>{project.gitUrl}</a>
				</p>
				<p>
					URL: <a>https://romland.dev</a>
				</p>
				<p>
					Last updated:{' '}
					<span>{project.updatedAt ? dayjs(project.updatedAt).format('YYYY-MM-DD HH:mm:ss') : 'Never'}</span>
				</p>
			</div>
		</div>
	);
}
