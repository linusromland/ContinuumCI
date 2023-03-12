// External Dependencies
import { Link } from 'react-router-dom';

// Internal Dependencies
import style from './Breadcrumbs.module.scss';

export default function Breadcrumbs({
	path
}: {
	path: {
		name: string;
		link?: string;
	}[];
}): JSX.Element {
	return (
		<div className={style.breadcrumbs}>
			{path.map((item, index) => {
				return (
					<div
						className={style.item}
						key={index}
					>
						{item.link ? (
							<Link to={item.link}>{item.name}</Link>
						) : (
							<span>{item.name}</span>
						)}

						{index !== path.length - 1 && (
							<span className={style.separator}>{' >'}</span>
						)}
					</div>
				);
			})}
		</div>
	);
}
