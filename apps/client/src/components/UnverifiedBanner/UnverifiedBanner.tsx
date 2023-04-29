// Internal Dependencies
import { toast } from 'react-toastify';
import { resendVerificationEmail } from '../../utils/api/user';
import Button from '../Button/Button';
import style from './UnverifiedBanner.module.scss';
import useTranslations from '../../i18n/translations';

type UnverifiedBannerProps = {
	recheckStatus: () => void;
};

export default function UnverifiedBanner({ recheckStatus }: UnverifiedBannerProps) {
	const t = useTranslations();

	return (
		<div className={style.unverifiedBanner}>
			<img
				src='/icons/warning.svg'
				alt='Warning'
			/>
			<p>{t.unverifiedBanner.description}</p>
			<div className={style.actions}>
				<Button
					text={t.unverifiedBanner.resendEmail}
					theme='secondary'
					onClick={async () => {
						const response = await resendVerificationEmail();

						if (response.success) {
							toast.success(t.unverifiedBanner.resendSuccess);
						} else {
							toast.error(t.unverifiedBanner.resendError);
						}
					}}
					small
				/>
				<Button
					text={t.unverifiedBanner.checkVerification}
					theme='secondary'
					onClick={recheckStatus}
					small
				/>
			</div>
		</div>
	);
}
