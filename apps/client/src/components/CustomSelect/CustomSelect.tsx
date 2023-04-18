// External dependencies
import Select, { Props as SelectProps } from 'react-select';
import { FieldProps } from 'formik';

// Types
type OptionType = { value: string; label: string };
type CustomSelectProps = FieldProps & SelectProps<OptionType>;

const SELECT_HEIGHT = '2rem';

const customStyles = {
	control: (provided: object) => ({
		...provided,
		border: '2px solid #dadada',
		borderRadius: '0.5rem',
		fontWeight: 700,
		backgroundColor: '#f3f3f3',
		display: 'flex',
		alignItems: 'center',
		minHeight: SELECT_HEIGHT,
		maxHeight: SELECT_HEIGHT
	}),
	selectContainer: (provided: object) => ({
		...provided,
		minHeight: SELECT_HEIGHT,
		maxHeight: SELECT_HEIGHT
	}),
	singleValue: (provided: object) => ({
		...provided,
		fontSize: '0.9rem'
	})
};

export default function CustomSelect({ field, form, ...props }: CustomSelectProps): JSX.Element {
	return (
		<Select
			{...field}
			{...props}
			styles={customStyles}
			onChange={(option) => {
				form.setFieldValue(field.name, option);
			}}
		/>
	);
}
