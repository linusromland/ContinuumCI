// Internal Dependencies
import Widget from '../Widget/Widget';
import style from './Table.module.scss';

export default function Table({
	headers,
	data
}: {
	headers: string[];
	data: string[][];
}): JSX.Element {
	return (
		<Widget>
			<table className={style.table}>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							{row.map((cell, index) => (
								<td key={index}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</Widget>
	);
}
