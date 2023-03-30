// External dependencies
import { useState, useEffect } from 'react';

// Internal dependencies
import style from './EnviromentVariablesTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';
import CreateVariableModal from '../CreateVariableModal/CreateVariableModal';
import {
	createVariable,
	getAllVariables,
	deleteVariable
} from '../../../../utils/api/enviromentVariable';
import { EnvironmentVariablesClass } from 'shared/src/classes';
import { toast } from 'react-toastify';

export default function EnviromentVariablesTable({
	projectId
}: {
	projectId: string;
}): JSX.Element {
	const [variables, setVariables] = useState(
		[] as EnvironmentVariablesClass[]
	);
	const [confirmDelete, setConfirmDelete] = useState('');

	const [createModalOpen, setCreateModalOpen] = useState(false);

	const getData = async () => {
		const response = await getAllVariables(projectId);
		if (response) {
			setVariables(response.data || []);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Widget>
				<div className={style.container}>
					<h1 className={style.title}>Enviroment Variables</h1>
					<p className={style.text}>
						These values will be used in all containers of this
						project.
					</p>
					<Table
						widget={false}
						headers={['Name', 'Value', 'Actions']}
						data={[
							...variables.map((variable) => [
								variable.name,
								<input
									className={style.input}
									type='text'
									value={variable.value}
								/>,
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
										onClick={() => {
											console.log('Save', variable._id);
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
				open={createModalOpen}
				onClose={() => {
					setCreateModalOpen(false);
				}}
				submit={async (values) => {
					const response = await createVariable({
						project: projectId,
						name: values.name,
						value: values.value
					});

					if (response) {
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
