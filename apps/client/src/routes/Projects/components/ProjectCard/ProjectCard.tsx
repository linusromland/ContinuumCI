// External dependencies
import clsx from 'clsx';

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
	return (
		<div
			className={style.container}
			onClick={onClick}
		>
			<div className={style.topBar}>
				<h1>{project.name}</h1>
			</div>
			<div>
				<p>
					Status: <span>Everything operating normally!</span>
				</p>
				<p>
					Sync status: <span>Out of sync</span>
				</p>
				<p>
					Repository: <span>{project.gitUrl}</span>
				</p>
			</div>
		</div>
	);
}
