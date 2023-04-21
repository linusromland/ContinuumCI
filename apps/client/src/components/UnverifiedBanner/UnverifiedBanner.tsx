// Internal Dependencies
import { toast } from 'react-toastify';
import { resendVerificationEmail } from '../../utils/api/user';
import Button from '../Button/Button';
import style from './UnverifiedBanner.module.scss';

type UnverifiedBannerProps = {
	recheckStatus: () => void;
};

export default function UnverifiedBanner({ recheckStatus }: UnverifiedBannerProps) {
	return (
		<div className={style.unverifiedBanner}>
			<img
				src='/icons/warning.svg'
				alt='Warning'
			/>
			<p>Your email address has not been verified. Please check your email for a verification link.</p>
			<div className={style.actions}>
				<Button
					text='Resend email'
					theme='secondary'
					onClick={async () => {
						const response = await resendVerificationEmail();

						if (response.success) {
							toast.success('Verification email sent');
						} else {
							toast.error('Failed to send verification email');
						}
					}}
					small
				/>
				<Button
					text='Check verification status'
					theme='secondary'
					onClick={recheckStatus}
					small
				/>
			</div>
		</div>
	);
}
