// Internal dependencies
import style from './StatsWidget.module.scss';
import cs from '../../utils/classNames';
import Widget from '../Widget/Widget';

export default function StatsWidget({
	title,
	value,
	maxValue,
	valueRange = {
		ok: [0, 75],
		warning: [75, 90],
		danger: [90, 100]
	},
	unit = '%',
	footer
}: {
	title: string;
	value: number | string;
	maxValue?: number;
	valueRange?:
		| {
				ok: [number, number];
				warning: [number, number];
				danger: [number, number];
		  }
		| undefined;
	unit?: string;
	footer?: string;
}): JSX.Element {
	function getStatusClass() {
		if (!valueRange || typeof value !== 'number') return '';

		let range = valueRange;

		if (unit !== '%' && maxValue) {
			range = {
				ok: [
					maxValue * (valueRange.ok[0] / 100),
					maxValue * (valueRange.ok[1] / 100)
				],
				warning: [
					maxValue * (valueRange.warning[0] / 100),
					maxValue * (valueRange.warning[1] / 100)
				],
				danger: [
					maxValue * (valueRange.danger[0] / 100),
					maxValue * (valueRange.danger[1] / 100)
				]
			};
		} else if (unit !== '%' && !maxValue) {
			return '';
		}

		console.log(title, range);

		if (value >= range.ok[0] && value <= range.ok[1]) {
			return style.ok;
		} else if (value >= range.warning[0] && value <= range.warning[1]) {
			return style.warning;
		} else if (value >= range.danger[0] && value <= range.danger[1]) {
			return style.danger;
		} else {
			return style.ok;
		}
	}

	return (
		<Widget>
			<>
				<h3 className={style.title}>{title}</h3>
				<p className={cs(style.value, getStatusClass())}>
					{value}
					{unit}
				</p>
				<p className={style.footer}>{footer}</p>
			</>
		</Widget>
	);
}
