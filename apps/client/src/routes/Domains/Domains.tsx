// External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import style from './Domains.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { NginxDeploymentClass } from 'shared/src/classes';
import Widget from '../../components/Widget/Widget';
import Table from '../../components/Table/Table';
import { Loading } from '../../components/Loading/Loading';
import { getDeployments } from '../../utils/api/nginx/deployment';
import DomainModal from './components/DomainModal/DomainModal';

export default function Domains() {
	const [domains, setDomains] = useState([] as NginxDeploymentClass[]);
	const [selectedDomain, setSelectedDomain] = useState({} as NginxDeploymentClass);
	const [modalOpen, setModalOpen] = useState(false);
	const [dataReady, setDataReady] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		setDataReady(false);
		const response = await getDeployments();
		if (response.success && response.data) {
			setDomains(response.data);
		}
		setDataReady(true);
	}

	if (!dataReady) return <Loading />;

	return (
		<>
			<main className={style.main}>
				<Breadcrumbs
					path={[
						{
							name: 'Domains',
							link: '/domains'
						}
					]}
				/>
				<div className={style.content}>
					{domains && domains.length > 0 && (
						<>
							<h1 className={style.title}>Domains</h1>
							<Widget contentClass={style.contentClass}>
								<div className={style.container}>
									<Table
										widget={false}
										headers={['Server Name', 'Locations', 'SSL Configured']}
										data={domains.map((domain) => [
											domain.server_name,
											`${domain.locations.length} location${
												domain.locations.length > 1 ? 's' : ''
											}`,
											domain.ssl ? 'Yes' : 'No'
										])}
										onRowClick={(row) => {
											const clickedDomain = domains.find(
												(domain) => domain.server_name === row[0]
											);

											if (clickedDomain) {
												setSelectedDomain(clickedDomain);
												setModalOpen(true);
											}
										}}
									/>
								</div>
							</Widget>
						</>
					)}
					{domains && domains.length === 0 && (
						<>
							<h2 className={style.title}>Domains</h2>
							<p>No domains found.</p>
						</>
					)}
				</div>
			</main>
			<DomainModal
				open={modalOpen}
				onClose={(update) => {
					setModalOpen(false);
					if (update) getData();
				}}
				domain={selectedDomain}
			/>
		</>
	);
}
