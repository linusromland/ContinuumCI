// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';

// Internal dependencies
import style from './TextEditModal.module.scss';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

interface TextEditModalProps {
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
	initialValues: FormikValues;
	validationSchema: unknown;
	title?: string;
	fieldName?: string;
}

export default function TextEditModal({
	onClose,
	submit,
	open,
	initialValues,
	validationSchema,
	title = 'Edit',
	fieldName = 'inputName'
}: TextEditModalProps) {
	return (
		<Modal
			title={title}
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={initialValues}
				enableReinitialize
				validationSchema={validationSchema}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={style.form}>
						<div className={style.formGroup}>
							<label
								htmlFor={fieldName}
								className={style.formLabel}
							/>
							<Field
								name={fieldName}
								type='text'
								placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
								className={style.formInput}
							/>
							<ErrorMessage
								name={fieldName}
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text={`Update ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
							disabled={isSubmitting}
							onClick={() => {
								submit(values);
							}}
							theme='secondary'
							className={clsx(style.row2, style.col1)}
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
