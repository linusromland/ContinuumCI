// External dependencies
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import style from './CreateDomainModal.module.scss';
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

interface DomainModalProps {
	onClose: (update: boolean) => void;
	open: boolean;
}

export default function CreateDomainModal({ open, onClose }: DomainModalProps) {
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
				title='Create Domain'
				onClose={() => console.log("Can't close")}
				open={open}
			>
				<Loading />
			</Modal>
		);
	}

	return (
		<Modal
			title='Create Domain'
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
						};
						websocket?: boolean;
						internal?: boolean;
					}[],
					ssl: false
				}}
				enableReinitialize
				validationSchema={Yup.object({
					server_name: Yup.string()
						.required('Required')
						.matches(/^[a-z]+$/, 'Only small letters a-z allowed'),
					domain: Yup.string().required('Required'),
					locations: Yup.array()
						.of(
							Yup.object({
								location: Yup.string().required('Required'),
								proxy_pass: Yup.string().required('Required'),
								project: Yup.object({
									id: Yup.string().required('Required'),
									service: Yup.string().required('Required')
								}),
								websocket: Yup.boolean(),
								internal: Yup.boolean()
							})
						)
						.min(1, 'At least one location is required'),
					ssl: Yup.boolean()
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ values }) => (
					<Form className={style.form}>
						<div className={style.formGroup}>
							<label
								htmlFor='server_name'
								className={style.formLabel}
							>
								Server Name
							</label>
							<div className={style.serverNameInput}>
								<Field
									name='server_name'
									type='text'
									placeholder='Server Name'
									className={style.formInput}
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
								className={style.formError}
							/>
						</div>
						<div className={style.locationsList}>
							{values.locations.map((location, index) => (
								<div
									className={style.location}
									key={index}
								>
									<div className={style.formGroup}>
										<label
											htmlFor={`locations[${index}].type`}
											className={style.formLabel}
										>
											Type
										</label>
										<Field
											name={`locations[${index}].type`}
											component={CustomSelect}
											options={[
												{ value: 'project', label: 'Project service' },
												{ value: 'custom', label: 'Custom' }
											]}
											placeholder='Type'
										/>
										<ErrorMessage
											name={`locations[${index}].type`}
											component='div'
											className={style.formError}
										/>
									</div>

									{location.type.value === 'project' && (
										<>
											<div className={style.formGroup}>
												<label
													htmlFor={`locations[${index}].project.id`}
													className={style.formLabel}
												>
													Project
												</label>
												<Field
													name={`locations[${index}].project.id`}
													component={CustomSelect}
													options={projects.map((project) => ({
														value: project._id,
														label: project.name
													}))}
													placeholder='Project'
												/>
												<ErrorMessage
													name={`locations[${index}].project.id`}
													component='div'
													className={style.formError}
												/>
											</div>
											<div className={style.formGroup}>
												<label
													htmlFor={`locations[${index}].project.service`}
													className={style.formLabel}
												>
													Service
												</label>
												<Field
													name={`locations[${index}].project.service`}
													component={CustomSelect}
													options={
														projects
															.find(
																(project) =>
																	project._id.toString() ===
																	location.project?.id.value
															)
															?.services.map((service) => ({
																value: service.name,
																label: service.name
															})) || []
													}
													placeholder='Service'
												/>
												<ErrorMessage
													name={`locations[${index}].project.service`}
													component='div'
													className={style.formError}
												/>
											</div>
										</>
									)}
									{location.type.value === 'custom' && (
										<div className={style.formGroup}>
											<label
												htmlFor={`locations[${index}].proxy_pass`}
												className={style.formLabel}
											>
												Proxy Pass
											</label>
											<Field
												name={`locations[${index}].proxy_pass`}
												type='text'
												placeholder='Proxy Pass'
												className={style.formInput}
											/>
											<ErrorMessage
												name={`locations[${index}].proxy_pass`}
												component='div'
												className={style.formError}
											/>
										</div>
									)}
									<div className={style.formGroup}>
										<div className={style.formCheckGroup}>
											<label
												htmlFor={`locations[${index}].websocket`}
												className={style.formLabel}
											>
												Support for Websocket
											</label>
											<Field
												name={`locations[${index}].websocket`}
												type='checkbox'
												className={style.formInput}
											/>
										</div>
										<ErrorMessage
											name={`locations[${index}].websocket`}
											component='div'
											className={style.formError}
										/>
									</div>

									<div className={style.formGroup}>
										<div className={style.formCheckGroup}>
											<label
												htmlFor={`locations[${index}].internal`}
												className={style.formLabel}
											>
												Prohibit external access
											</label>
											<Field
												name={`locations[${index}].internal`}
												type='checkbox'
												className={style.formInput}
											/>
										</div>
										<ErrorMessage
											name={`locations[${index}].websocket`}
											component='div'
											className={style.formError}
										/>
									</div>
								</div>
							))}
							<div className={style.formGroup}>
								<div className={style.formCheckGroup}>
									<label
										htmlFor='ssl'
										className={style.formLabel}
									>
										Configure SSL
									</label>
									<Field
										name='ssl'
										type='checkbox'
										className={style.formInput}
									/>
								</div>
								<ErrorMessage
									name='ssl'
									component='div'
									className={style.formError}
								/>
							</div>
						</div>

						<div className={style.actions}>
							<Button
								text='Create Domain'
								theme='success'
								small
								onClick={async () => {
									const deploymentValues = {
										server_name: values.server_name + values.domain.value,
										ssl: values.ssl,
										locations: values.locations.map((location) => ({
											location: location.location,
											proxy_pass:
												location.type.value === 'project'
													? 'http://host.docker.internal:' +
													  projects
															.find(
																(project) =>
																	project._id.toString() ===
																	location.project?.id.value
															)
															?.services.find(
																(service) =>
																	service.name === location.project?.service.value
															)?.containerPorts[0]
													: location.proxy_pass,
											websocket: location.websocket ? true : false,
											internal: location.internal ? true : false
										}))
									};

									const response = await createDeployment(deploymentValues);

									if (response.success) {
										toast.success('Domain created successfully');
										onClose(true);
									} else {
										toast.error('Something went wrong while creating domain');
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
