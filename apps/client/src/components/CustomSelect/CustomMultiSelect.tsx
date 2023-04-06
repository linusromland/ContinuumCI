// External dependencies
import { Props as SelectProps } from 'react-select';
import { FieldProps } from 'formik';

// Internal dependencies
import CustomSelect from './CustomSelect';

// Types
type OptionType = { value: string; label: string };
type CustomSelectProps = FieldProps & SelectProps<OptionType>;

export default function CustomMultiSelect({
	...props
}: CustomSelectProps): JSX.Element {
	return (
		<CustomSelect
			{...props}
			isMulti
		/>
	);
}
