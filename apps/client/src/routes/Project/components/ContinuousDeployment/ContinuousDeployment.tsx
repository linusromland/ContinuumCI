// External dependencies
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './ContinuousDeployment.module.scss';
import Widget from '../../../../components/Widget/Widget';
import useTranslations from '../../../../i18n/translations';
import Button from '../../../../components/Button/Button';

interface ContinuousDeploymentProps {
	token: string;
	regenerateToken: () => void;
}

export default function ContinuousDeployment({ token, regenerateToken }: ContinuousDeploymentProps): JSX.Element {
	const t = useTranslations();
	const [confirmRegenerate, setConfirmRegenerate] = useState(false);

	const API_HOST = import.meta.env.VITE_API_URL || 'http://localhost:3000';

	function copyToClipboard(text: string) {
		try {
			navigator.clipboard.writeText(text);
			toast.success(t.continuousDeployment.copySuccess);
		} catch (error) {
			toast.error(t.continuousDeployment.copyError);
		}
	}

	return (
		<Widget>
			<div className={style.container}>
				<div className={style.title}>
					<img
						src='/icons/auto.svg'
						alt='Containers'
					/>
					<h1>{t.continuousDeployment.title}</h1>
				</div>

				<div className={style.wrapper}>
					<h2>{t.continuousDeployment.token}</h2>
					<div className={style.valueWrapper}>
						<p>{token}</p>
						<Button
							text={t.continuousDeployment.copy}
							onClick={() => copyToClipboard(token)}
							small
						/>
						<Button
							text={
								confirmRegenerate
									? t.continuousDeployment.confirmRegenerateToken
									: t.continuousDeployment.regenerateToken
							}
							onClick={() => {
								if (confirmRegenerate) {
									regenerateToken();
									setConfirmRegenerate(false);
								} else setConfirmRegenerate(true);
							}}
							small
						/>
					</div>
				</div>
				<div className={style.wrapper}>
					<h2>{t.continuousDeployment.apiURL}</h2>
					<div className={style.valueWrapper}>
						<p>{API_HOST}</p>
						<Button
							text={t.continuousDeployment.copy}
							onClick={() => copyToClipboard(API_HOST)}
							small
						/>
					</div>
				</div>
				<p>
					{t.continuousDeployment.footerText}{' '}
					<a
						href='https://github.com/linusromland/ContinuumCI/blob/master/docs/deployment/README.md#getting-started-with-continuumci-continuous-deployment'
						target='_blank'
					>
						{t.continuousDeployment.documentation}
					</a>
				</p>
			</div>
		</Widget>
	);
}
