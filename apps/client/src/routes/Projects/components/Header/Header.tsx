// Internal dependencies
import style from './Header.module.scss';

export default function Header() {
	return (
		<header className={style.header}>
			<h1>Projects</h1>
			<div className={style.lastUpdated}>
				<p>
					Last updated:
					<span> 1 minute ago</span>
				</p>
				<button>
					<img
						src='/icons/refresh.svg'
						alt='Refresh'
					/>
				</button>
			</div>
		</header>
	);
}
