// External dependencies
import Select, { Props as SelectProps, StylesConfig } from 'react-select';
import { FieldProps } from 'formik';

// Types
type OptionType = { value: string; label: string };
type CustomSelectProps = FieldProps & SelectProps<OptionType>;

export const customStyles: StylesConfig<OptionType, false> = {
	control: (provided, state) => ({
		...provided,
		backgroundColor: '#f3f3f3',
		borderRadius: '0.5rem',
		border: `2px solid ${state.isFocused ? '#0084ff' : 'darken(#f3f3f3, 10%)'}`,
		color: '#000000',
		fontSize: '0.9rem',
		fontWeight: 600,
		padding: '0',
		transition: 'background-color 0.2s ease-in-out',
		boxShadow: state.isFocused ? '0 0 3px rgba(0, 132, 255, 0.6)' : 'none',
		'&:hover': {
			borderColor: state.isFocused ? '#0084ff' : 'darken(#f3f3f3, 20%)'
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: '1.8rem',
		maxHeight: '1.8rem'
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? '#0084ff' : 'white',
		color: state.isSelected ? 'white' : 'black',
		'&:hover': {
			backgroundColor: state.isSelected ? '#0084ff' : '#f3f3f3'
		}
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: '#f3f3f3',
		borderRadius: '0.5rem',
		zIndex: 999
	}),
	menuList: (provided) => ({
		...provided,
		paddingTop: 0,
		paddingBottom: 0
	}),
	multiValue: (provided) => ({
		...provided,
		backgroundColor: '#a4e869',
		color: '#000000',
		fontSize: '0.9rem',
		fontWeight: 600,
		marginLeft: '0',
		marginRight: '0.5rem'
	}),
	multiValueLabel: (provided) => ({
		...provided,
		color: '#000000',
		fontSize: '0.7rem',
		fontWeight: 600,
		padding: '0.2rem'
	}),
	singleValue: (provided) => ({
		...provided,
		color: '#000000',
		fontSize: '0.9rem',
		fontWeight: 600,
		marginLeft: '0',
		marginRight: '0.5rem'
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		color: '#000000',
		padding: '0.3rem'
	}),
	valueContainer: (provided) => ({
		...provided,
		minHeight: '1.8rem',
		maxHeight: '1.8rem',
		padding: '0 0.5rem'
	}),
	indicatorsContainer: (provided) => ({
		...provided,
		minHeight: '1.8rem',
		maxHeight: '1.8rem'
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
