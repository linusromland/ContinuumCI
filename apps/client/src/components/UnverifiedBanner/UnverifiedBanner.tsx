// Internal Dependencies
import style from './UnverifiedBanner.module.scss';

export default function UnverifiedBanner() {
	return (
		<div className={style.unverifiedBanner}>
			<img
				src='/icons/warning.svg'
				alt='Warning'
			/>
			<p>Your email address has not been verified. Please check your email for a verification link.</p>
		</div>
	);
}
