// External dependencies
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './DomainModal.module.scss';
import Modal from '../../../../components/Modal/Modal';
import { NginxDeploymentClass } from 'shared/src/classes';
import Button from '../../../../components/Button/Button';
import { removeDeployment } from '../../../../utils/api/nginx/deployment';

interface DomainModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
	domain: NginxDeploymentClass;
}

export default function DomainModal({ open, onClose, domain }: DomainModalProps) {
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
					<h3 className={style.label}>Server Name</h3>
					<p className={style.value}>{domain.server_name}</p>
				</div>
				<div className={style.item}>
					<h3 className={style.label}>Configured for SSL</h3>
					<p className={style.value}>{domain.ssl ? 'Yes' : 'No'}</p>
				</div>
				<div className={style.locations}>
					{domain.locations &&
						domain.locations.map((location, index) => (
							<div key={index}>
								<div className={style.item}>
									<h4 className={style.label}>Location</h4>
									<p className={style.value}>{location.location}</p>
								</div>
								<div className={style.item}>
									<h4 className={style.label}>Proxy Pass</h4>
									<p className={style.value}>{location.proxy_pass}</p>
								</div>
								<div className={style.item}>
									<h4 className={style.label}>Configured for Websocket</h4>
									<p className={style.value}>{location.websocket ? 'Yes' : 'No'}</p>
								</div>
								<div className={style.item}>
									<h4 className={style.label}>Internal only</h4>
									<p className={style.value}>{location.internal ? 'Yes' : 'No'}</p>
								</div>
							</div>
						))}
				</div>
				<div className={style.actions}>
					<Button
						text={confirmDelete ? 'Confirm Delete' : 'Delete Domain'}
						theme='error'
						small
						onClick={async () => {
							if (!confirmDelete) {
								setConfirmDelete(true);
								return;
							}

							const response = await removeDeployment(domain._id);

							if (response.success) {
								toast.success('Domain deleted successfully');
								onClose(true);
								return;
							}

							toast.error('Failed to delete domain');
						}}
					/>
				</div>
			</div>
		</Modal>
	);
}
