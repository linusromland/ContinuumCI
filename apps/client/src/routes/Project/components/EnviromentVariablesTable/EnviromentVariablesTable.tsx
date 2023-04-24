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
import useTranslations from '../../../../i18n/translations';

interface EnviromentVariablesTableProps {
	project: ProjectClass;
}

export default function EnviromentVariablesTable({ project }: EnviromentVariablesTableProps): JSX.Element {
	const t = useTranslations();
	const [variables, setVariables] = useState([] as EnvironmentVariablesClass[]);
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
						<h1>{t.enviromentVariablesTable.title}</h1>
					</div>
					<p className={style.text}>{t.enviromentVariablesTable.description}</p>
					<Table
						widget={false}
						headers={[
							t.enviromentVariablesTable.name,
							t.enviromentVariablesTable.value,
							t.enviromentVariablesTable.services,
							t.enviromentVariablesTable.actions
						]}
						data={[
							...variables.map((variable, index) => [
								variable.name,
								<input
									className={style.input}
									type='text'
									value={variableInputs[index] || variable.value}
									onChange={(e) => {
										const vars = [...variableInputs];
										vars[index] = e.target.value;
										setVariableInputs(vars);
									}}
								/>,
								<p>
									{variable.services.length === (project.services || []).length
										? t.enviromentVariablesTable.all
										: variable.services.join(', ')}
								</p>,

								<div className={style.buttons}>
									<Button
										text={
											variable._id === confirmDelete
												? t.enviromentVariablesTable.confirmRemove
												: t.enviromentVariablesTable.remove
										}
										theme='error'
										onClick={async () => {
											if (variable._id === confirmDelete) {
												const response = await deleteVariable(variable._id);

												setConfirmDelete('');

												if (response) {
													toast.success(t.enviromentVariablesTable.removeSuccess);
													getData();
												} else {
													toast.error(t.enviromentVariablesTable.removeError);
												}
											} else {
												setConfirmDelete(variable._id || '');
											}
										}}
										small
									/>
									<Button
										text={t.enviromentVariablesTable.save}
										theme='success'
										onClick={async () => {
											if (!variableInputs[index]) return;

											const variablesCopy = variables[index];
											variablesCopy.value = variableInputs[index];

											const response = await updateVariable(variablesCopy);

											if (response.success) {
												toast.success(t.enviromentVariablesTable.updateSuccess);
												getData();
											} else {
												toast.error(t.enviromentVariablesTable.updateError);
											}
										}}
										small
									/>
								</div>
							])
						]}
					/>
					<Button
						text={t.enviromentVariablesTable.addNew}
						theme='primary'
						onClick={() => {
							setCreateModalOpen(true);
						}}
						small
					/>
				</div>
			</Widget>
			<CreateVariableModal
				serviceList={project.services ? project.services.map((service) => service.name) : []}
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
						toast.success(t.enviromentVariablesTable.createSuccess);
					} else {
						toast.error(t.enviromentVariablesTable.createError);
					}

					setCreateModalOpen(false);
				}}
			/>
		</>
	);
}
