// Internal dependencies
import style from './Loading.module.scss';

export const Loading = () => {
	return (
		<div className={style.loading}>
			<div className={style.loadingSpinner} />
		</div>
	);
};
