// Internal Dependencies
import Widget from '../Widget/Widget';
import useTranslations from '../../i18n/translations';
import style from './Table.module.scss';

function Wrapper({ children }: { children: JSX.Element }): JSX.Element {
	return <div className={style.wrapper}>{children}</div>;
}

interface TableProps {
	headers: string[];
	data: (string | JSX.Element)[][];
	widget?: boolean;
	onRowClick?: (row: (string | JSX.Element)[]) => void;
}

export default function Table({ headers, data, widget = true, onRowClick }: TableProps): JSX.Element {
	const t = useTranslations();
	const WrapperComponent = widget ? Widget : Wrapper;

	return (
		<WrapperComponent minSize>
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
						<tr
							key={index}
							onClick={() => onRowClick && onRowClick(row)}
							className={onRowClick ? style.rowClickable : ''}
						>
							{row.map((cell, index) => (
								<td key={index}>{cell}</td>
							))}
						</tr>
					))}
					{data.length === 0 && (
						<tr>
							<td
								colSpan={headers.length}
								className={style.empty}
							>
								{t.table.noData}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</WrapperComponent>
	);
}
