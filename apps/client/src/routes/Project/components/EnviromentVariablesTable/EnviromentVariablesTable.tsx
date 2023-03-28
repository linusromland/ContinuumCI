// Internal dependencies
import style from './EnviromentVariablesTable.module.scss';
import Button from '../../../../components/Button/Button';
import Table from '../../../../components/Table/Table';
import Widget from '../../../../components/Widget/Widget';

export default function EnviromentVariablesTable({
	projectId
}: {
	projectId: string;
}): JSX.Element {
	return (
		<Widget>
			<div className={style.container}>
				<h1 className={style.title}>Enviroment Variables</h1>
				<p className={style.text}>
					These values will be used in all containers of this project.
				</p>
				<Table
					widget={false}
					headers={['Name', 'Value', 'Actions']}
					data={[
						[
							'API_URL',
							<input
								className={style.input}
								type='text'
								value='https://api.example.com'
							/>,
							<div className={style.buttons}>
								<Button
									text='Delete'
									theme='error'
									onClick={() => {
										console.log('Delete');
									}}
									small
								/>
								<Button
									text='Save'
									theme='success'
									onClick={() => {
										console.log('Delete');
									}}
									small
								/>
							</div>
						]
					]}
				/>
				<Button
					text='Add new'
					theme='primary'
					onClick={() => {
						console.log('Add new');
					}}
					small
				/>
			</div>
		</Widget>
	);
}
