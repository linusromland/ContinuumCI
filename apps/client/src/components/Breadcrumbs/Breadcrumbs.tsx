// External Dependencies
import { Link } from 'react-router-dom';

// Internal Dependencies
import style from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
	path: {
		name: string;
		link?: string;
	}[];
}

export default function Breadcrumbs({ path }: BreadcrumbsProps): JSX.Element {
	return (
		<div className={style.breadcrumbs}>
			{path.map((item, index) => {
				return (
					<div
						className={style.item}
						key={index}
					>
						{item.link ? (
							<Link
								to={item.link}
								className={style.link}
							>
								{item.name}
							</Link>
						) : (
							<span>{item.name}</span>
						)}

						{index !== path.length - 1 && <span className={style.separator}>{' >'}</span>}
					</div>
				);
			})}
		</div>
	);
}
