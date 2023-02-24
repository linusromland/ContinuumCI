// External dependencies
import Select, { Props as SelectProps } from 'react-select';
import { FieldProps } from 'formik';

// Types
type OptionType = { value: string; label: string };
type CustomSelectProps = FieldProps & SelectProps<OptionType>;

const customStyles = {
	control: (provided: object) => ({
		...provided,
		border: '2px solid #dadada',
		borderRadius: '0.25rem',
		fontSize: '1rem',
		fontWeight: 700,
		margin: '0.5rem 0'
	})
};

export default function CustomSelect({
	field,
	form,
	...props
}: CustomSelectProps): JSX.Element {
	return (
		<Select
			{...field}
			{...props}
			styles={customStyles}
			onChange={(option) => {
				form.setFieldValue(field.name, option);
			}}
			classNamePrefix='react-select__option'
		/>
	);
}
