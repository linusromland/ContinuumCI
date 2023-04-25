// External dependencies
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './DomainModal.module.scss';
import Modal from '../../../../components/Modal/Modal';
import { NginxDeploymentClass } from 'shared/src/classes';
import Button from '../../../../components/Button/Button';
import { removeDeployment } from '../../../../utils/api/nginx/deployment';
import useTranslations from '../../../../i18n/translations';

interface DomainModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
	domain: NginxDeploymentClass;
}

export default function DomainModal({ open, onClose, domain }: DomainModalProps) {
	const t = useTranslations();

	const [confirmDelete, setConfirmDelete] = useState(false);

	if (!domain) return null;

	return (
		<Modal
			title={domain.server_name}
			onClose={() => onClose(false)}
			open={open}
		>
			<div>
				<div className={style.item}>
					<h3 className={style.label}>{t.domains.serverName}</h3>
					<p className={style.value}>{domain.server_name}</p>
				</div>
				<div className={style.item}>
					<h3 className={style.label}>{t.domains.sslConfigured}</h3>
					<p className={style.value}>{domain.ssl ? t.domains.yes : t.domains.no}</p>
				</div>
				<div className={style.locations}>
					{domain.locations &&
						domain.locations.map((location, index) => (
							<div key={index}>
								<div className={style.item}>
									<h4 className={style.label}>{t.domains.location}</h4>
									<p className={style.value}>{location.location}</p>
								</div>
								<div className={style.item}>
									<h4 className={style.label}>{t.domains.proxyPass}</h4>
									<p className={style.value}>{location.proxy_pass}</p>
								</div>
								<div className={style.item}>
									<h4 className={style.label}>{t.domains.websocketConfigured}</h4>
									<p className={style.value}>{location.websocket ? t.domains.yes : t.domains.no}</p>
								</div>
								<div className={style.item}>
									<h4 className={style.label}>{t.domains.internalOnly}</h4>
									<p className={style.value}>{location.internal ? t.domains.yes : t.domains.no}</p>
								</div>
							</div>
						))}
				</div>
				<div className={style.actions}>
					<Button
						text={confirmDelete ? t.domains.confirmRemove : t.domains.remove}
						theme='error'
						small
						onClick={async () => {
							if (!confirmDelete) {
								setConfirmDelete(true);
								return;
							}

							const response = await removeDeployment(domain._id);

							if (response.success) {
								toast.success(t.domains.removeSuccess);
								onClose(true);
								return;
							}

							toast.error(t.domains.removeError);
						}}
					/>
				</div>
			</div>
		</Modal>
	);
}
