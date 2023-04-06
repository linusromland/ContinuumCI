// External dependencies
import { useState, useEffect } from 'react';

// Internal dependencies
import style from './EnviromentVariablesTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import CreateVariableModal from '../CreateVariableModal/CreateVariableModal';
import {
	getAllVariables,
	createVariable,
	updateVariable,
	deleteVariable
} from '../../../../utils/api/enviromentVariable';
import { EnvironmentVariablesClass, ProjectClass } from 'shared/src/classes';
import { toast } from 'react-toastify';

export default function EnviromentVariablesTable({
	project
}: {
	project: ProjectClass;
}): JSX.Element {
	const [variables, setVariables] = useState(
		[] as EnvironmentVariablesClass[]
	);
	const [confirmDelete, setConfirmDelete] = useState('');
	const [variableInputs, setVariableInputs] = useState([] as string[]);

	const [createModalOpen, setCreateModalOpen] = useState(false);

	const getData = async () => {
		if (!project._id) return;

		const response = await getAllVariables(project._id);
		if (response) {
			setVariables(response.data || []);
			setVariableInputs([]);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Widget>
				<div className={style.container}>
					<div className={style.title}>
						<img
							src='/icons/env.svg'
							alt='Enviroment Variables'
						/>
						<h1>Enviroment Variables</h1>
					</div>
					<p className={style.text}>
						These values will be used in all containers of this
						project.
					</p>
					<Table
						widget={false}
						headers={['Name', 'Value', 'Services', 'Actions']}
						data={[
							...variables.map((variable, index) => [
								variable.name,
								<input
									className={style.input}
									type='text'
									value={
										variableInputs[index] || variable.value
									}
									onChange={(e) => {
										const vars = [...variableInputs];
										vars[index] = e.target.value;
										setVariableInputs(vars);
									}}
								/>,
								<p>
									{variable.services.length ===
									(project.services || []).length
										? 'All'
										: variable.services.join(', ')}
								</p>,

								<div className={style.buttons}>
									<Button
										text={
											variable._id === confirmDelete
												? 'Confirm'
												: 'Remove'
										}
										theme='error'
										onClick={async () => {
											if (
												variable._id === confirmDelete
											) {
												const response =
													await deleteVariable(
														variable._id
													);

												setConfirmDelete('');

												if (response) {
													toast.success(
														`Variable ${variable.name} deleted`
													);
													getData();
												} else {
													toast.error(
														`Error deleting variable ${variable.name}`
													);
												}
											} else {
												setConfirmDelete(
													variable._id || ''
												);
											}
										}}
										small
									/>
									<Button
										text='Save'
										theme='success'
										onClick={async () => {
											if (!variableInputs[index]) return;

											const variablesCopy =
												variables[index];
											variablesCopy.value =
												variableInputs[index];

											const response =
												await updateVariable(
													variablesCopy
												);

											if (response.success) {
												toast.success(
													`Variable ${variable.name} updated`
												);
												getData();
											} else {
												toast.error(
													`Error updating variable ${variable.name}`
												);
											}
										}}
										small
									/>
								</div>
							])
						]}
					/>
					<Button
						text='Add new'
						theme='primary'
						onClick={() => {
							setCreateModalOpen(true);
						}}
						small
					/>
				</div>
			</Widget>
			<CreateVariableModal
				serviceList={project.services || []}
				open={createModalOpen}
				onClose={() => {
					setCreateModalOpen(false);
				}}
				submit={async (values) => {
					if (!project._id) return;

					const response = await createVariable({
						project: project._id,
						name: values.name,
						value: values.value,
						services: values.services
					});

					if (response.success) {
						getData();
						toast.success(`Variable ${values.name} created`);
					} else {
						toast.error(`Error creating variable ${values.name}`);
					}

					setCreateModalOpen(false);
				}}
			/>
		</>
	);
}
