// External dependencies
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import style from './CreateDomainModal.module.scss';
import formStyle from '../../../../styles/formStyle.module.scss';
import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import { ProjectClass } from 'shared/src/classes';
import { getAllProjects } from '../../../../utils/api/projects';
import { getDomains as getNginxDomains } from '../../../../utils/api/nginx/domains';
import { Loading } from '../../../../components/Loading/Loading';
import { createDeployment } from '../../../../utils/api/nginx/deployment';
import { toast } from 'react-toastify';
import defaultProject from '../../../../utils/getdefaultProject';
import useTranslations from '../../../../i18n/translations';

interface DomainModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
}

export default function CreateDomainModal({ open, onClose }: DomainModalProps) {
	const t = useTranslations();

	const [projects, setProjects] = useState([] as ProjectClass[]);
	const [domains, setDomains] = useState(
		[] as {
			label: string;
			value: string;
		}[]
	);
	const [dataReady, setDataReady] = useState(false);

	async function getProjects() {
		const response = await getAllProjects();

		if (response.success && response.data) {
			setProjects([defaultProject, ...response.data]);
		}
	}

	async function getDomains() {
		const response = await getNginxDomains();

		if (response.success && response.data) {
			setDomains(response.data.map((domain) => ({ label: domain.name, value: `.${domain.name}` })));
		}
	}

	useEffect(() => {
		(async () => {
			await getProjects();
			await getDomains();
			setDataReady(true);
		})();
	}, []);

	if (!dataReady) {
		return (
			<Modal
				title={t.domains.title}
				onClose={() => console.log("Can't close")}
				open={open}
			>
				<Loading />
			</Modal>
		);
	}

	return (
		<Modal
			title={t.domains.title}
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					server_name: '',
					domain: domains[0]
						? domains[0]
						: {
								label: '',
								value: ''
						  },
					locations: [
						{
							location: '/',
							type: {
								label: '',
								value: ''
							},
							proxy_pass: ''
						}
					] as {
						location: string;
						domain: {
							label: string;
							value: string;
						};
						type: {
							label: string;
							value: string;
						};
						proxy_pass: string;
						project?: {
							id: {
								label: string;
								value: string;
							};
							service: {
								label: string;
								value: string;
							};
							port?: {
								label: string;
								value: string;
							};
						};
						websocket?: boolean;
						internal?: boolean;
					}[],
					ssl: false
				}}
				enableReinitialize
				validationSchema={Yup.object({
					server_name: Yup.string().matches(/^[a-z]+$/, t.domains.schema.serverName.matches),
					domain: Yup.object({
						label: Yup.string().required(t.domains.schema.domain.required),
						value: Yup.string().required(t.domains.schema.domain.required)
					}),
					locations: Yup.array()
						.of(
							Yup.object({
								type: Yup.object({
									label: Yup.string(),
									value: Yup.string()
								}),
								location: Yup.string().required(t.domains.schema.location.required),
								// When the type of the location in the array is set to "custom", the proxy_pass field is required
								proxy_pass: Yup.string().when('type', {
									is: (type: { label: string; value: string }) => type.value === 'custom',
									then: (schema) => schema.required(t.domains.schema.proxyPass.required)
								}),
								project: Yup.object({
									id: Yup.object({
										label: Yup.string(),
										value: Yup.string()
									}),
									service: Yup.object({
										label: Yup.string(),
										value: Yup.string()
									})
								}),
								websocket: Yup.boolean(),
								internal: Yup.boolean()
							})
						)
						.min(1, t.domains.schema.locationMin),
					ssl: Yup.boolean().required(t.domains.schema.ssl.required)
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ values }) => (
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='server_name'
								className={formStyle.formLabel}
							>
								{t.domains.serverName}
							</label>
							<div className={style.serverNameInput}>
								<Field
									name='server_name'
									type='text'
									placeholder={`(${t.domains.leaveEmptyForRoot})`}
									className={formStyle.formInput}
								/>
								<Field
									name='domain'
									component={CustomSelect}
									options={domains}
									placeholder='Domain'
								/>
							</div>
							<ErrorMessage
								name='server_name'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						{values.locations.map((location, index) => (
							<div
								className={style.location}
								key={index}
							>
								<div className={formStyle.formGroup}>
									<label
										htmlFor={`locations[${index}].type`}
										className={formStyle.formLabel}
									>
										{t.domains.type.title}
									</label>
									<Field
										name={`locations[${index}].type`}
										component={CustomSelect}
										options={[
											{ value: 'project', label: t.domains.type.project },
											{ value: 'custom', label: t.domains.type.custom }
										]}
										placeholder='Type'
									/>
									<ErrorMessage
										name={`locations[${index}].type`}
										component='div'
										className={formStyle.formError}
									/>
								</div>

								{location.type.value === 'project' && (
									<>
										<div className={formStyle.formGroup}>
											<label
												htmlFor={`locations[${index}].project.id`}
												className={formStyle.formLabel}
											>
												{t.domains.project}
											</label>
											<Field
												name={`locations[${index}].project.id`}
												component={CustomSelect}
												options={projects.map((project) => ({
													value: project._id,
													label: project.name
												}))}
												placeholder={t.domains.project}
											/>
											<ErrorMessage
												name={`locations[${index}].project.id`}
												component='div'
												className={formStyle.formError}
											/>
										</div>
										<div className={formStyle.formGroup}>
											<label
												htmlFor={`locations[${index}].project.service`}
												className={formStyle.formLabel}
											>
												{t.domains.service}
											</label>
											<Field
												name={`locations[${index}].project.service`}
												component={CustomSelect}
												options={
													projects
														.find(
															(project) =>
																project._id.toString() === location.project?.id.value
														)
														?.services.map((service) => ({
															value: service.name,
															label:
																service.name +
																(service.ports.length === 1
																	? ` (${t.domains.port} ${service.ports[0]})`
																	: '')
														})) || []
												}
												placeholder={t.domains.service}
											/>
											<ErrorMessage
												name={`locations[${index}].project.service`}
												component='div'
												className={formStyle.formError}
											/>
										</div>
										{location.project?.service?.value &&
											(projects
												.find(
													(project) => project._id.toString() === location.project?.id.value
												)
												?.services.find(
													(service) => service.name === location.project?.service.value
												)?.containerPorts?.length || 0) > 1 && (
												<div className={formStyle.formGroup}>
													<label
														htmlFor={`locations[${index}].project.port`}
														className={formStyle.formLabel}
													>
														{t.domains.port}
													</label>
													<Field
														name={`locations[${index}].project.port`}
														component={CustomSelect}
														options={
															projects
																.find(
																	(project) =>
																		project._id.toString() ===
																		location.project?.id.value
																)
																?.services.find(
																	(service) =>
																		service.name === location.project?.service.value
																)
																?.containerPorts.map((port) => ({
																	value: port,
																	label: port
																})) || []
														}
														placeholder={t.domains.port}
													/>
													<ErrorMessage
														name={`locations[${index}].project.port`}
														component='div'
														className={formStyle.formError}
													/>
												</div>
											)}
									</>
								)}
								{location.type.value === 'custom' && (
									<div className={formStyle.formGroup}>
										<label
											htmlFor={`locations[${index}].proxy_pass`}
											className={formStyle.formLabel}
										>
											{t.domains.proxyPass}
										</label>
										<Field
											name={`locations[${index}].proxy_pass`}
											type='text'
											placeholder={t.domains.proxyPass}
											className={formStyle.formInput}
										/>
										<ErrorMessage
											name={`locations[${index}].proxy_pass`}
											component='div'
											className={formStyle.formError}
										/>
									</div>
								)}
								<div className={formStyle.formGroup}>
									<div className={formStyle.formCheckGroup}>
										<label
											htmlFor={`locations[${index}].websocket`}
											className={formStyle.formLabel}
										>
											{t.domains.websocketConfigured}
										</label>
										<Field
											name={`locations[${index}].websocket`}
											type='checkbox'
											className={formStyle.formInput}
											placeholder={t.domains.websocketConfigured}
										/>
									</div>
									<ErrorMessage
										name={`locations[${index}].websocket`}
										component='div'
										className={formStyle.formError}
									/>
								</div>

								<div className={formStyle.formGroup}>
									<div className={formStyle.formCheckGroup}>
										<label
											htmlFor={`locations[${index}].internal`}
											className={formStyle.formLabel}
										>
											{t.domains.internalOnly}
										</label>
										<Field
											name={`locations[${index}].internal`}
											type='checkbox'
											className={formStyle.formInput}
											placeholder={t.domains.internalOnly}
										/>
									</div>
									<ErrorMessage
										name={`locations[${index}].websocket`}
										component='div'
										className={formStyle.formError}
									/>
								</div>
							</div>
						))}
						<div className={formStyle.formGroup}>
							<div className={formStyle.formCheckGroup}>
								<label
									htmlFor='ssl'
									className={formStyle.formLabel}
								>
									{t.domains.sslConfigured}
								</label>
								<Field
									name='ssl'
									type='checkbox'
									className={formStyle.formInput}
									placeholder={t.domains.sslConfigured}
								/>
							</div>
							<ErrorMessage
								name='ssl'
								component='div'
								className={formStyle.formError}
							/>
						</div>

						<div className={formStyle.actions}>
							<Button
								text={t.domains.createDomain}
								theme='success'
								small
								onClick={async () => {
									const proxy_passes: string[] = [];

									for (const location of values.locations) {
										if (location.type.value === 'project') {
											let port = location.project?.port?.value;

											if (!port) {
												const project = projects.find(
													(project) => project._id.toString() === location.project?.id.value
												);

												const service = project?.services.find(
													(service) => service.name === location.project?.service.value
												);

												port = service?.containerPorts[0].toString();
											}

											proxy_passes.push(`http://host.docker.internal:${port}`);
										} else {
											proxy_passes.push(location.proxy_pass);
										}
									}

									const deploymentValues = {
										server_name: values.server_name
											? values.server_name + values.domain.value
											: values.domain.value.substring(1),
										ssl: values.ssl,
										locations: values.locations.map((location, index) => ({
											location: location.location,
											proxy_pass: proxy_passes[index],
											websocket: location.websocket ? true : false,
											internal: location.internal ? true : false
										}))
									};

									const response = await createDeployment(deploymentValues);

									if (response.success) {
										toast.success(t.domains.createDomainSuccess);
										onClose(true);
									} else {
										toast.error(t.domains.createDomainError);
										onClose(false);
									}
								}}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
