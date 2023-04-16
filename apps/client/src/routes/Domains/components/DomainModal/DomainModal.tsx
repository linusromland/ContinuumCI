// Internal dependencies
import style from './DomainModal.module.scss';
import Modal from '../../../../components/Modal/Modal';
import { NginxDeploymentClass } from 'shared/src/classes';

interface DomainModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
	domain: NginxDeploymentClass;
}

export default function DomainModal({ open, onClose, domain }: DomainModalProps) {
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
					<h3 className={style.subtitle}>Locations</h3>
					{domain.locations &&
						domain.locations.map((location, index) => (
							<div
								className={style.location}
								key={index}
							>
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
			</div>
		</Modal>
	);
}
