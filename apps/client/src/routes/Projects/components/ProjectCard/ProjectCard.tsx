// External dependencies
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import style from './ProjectCard.module.scss';
import { ProjectDeploymentStatus } from 'shared/src/enums';
import useTranslations from '../../../../i18n/translations';

interface ProjectCardProps {
	project: ProjectClass;
	onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps): JSX.Element {
	const t = useTranslations();
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
					{t.projects.projectCard.status.title}:{' '}
					<span>{t.projects.projectCard.status[project.deploymentStatus.toString()]}</span>
				</p>
				<p>
					{t.projects.projectCard.syncStatus.title}:{' '}
					<span>{t.projects.projectCard.syncStatus[project.syncStatus]}</span>
				</p>
				<p>
					{t.projects.projectCard.repository}: <a>{project.gitUrl}</a>
				</p>
				<p>
					{t.projects.header.lastUpdated}:{' '}
					<span>{project.updatedAt ? dayjs(project.updatedAt).format('YYYY-MM-DD HH:mm:ss') : 'Never'}</span>
				</p>
			</div>
		</div>
	);
}
