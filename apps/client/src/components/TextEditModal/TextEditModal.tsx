// External dependencies
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';

// Internal dependencies
import formStyle from '../../styles/formStyle.module.scss';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import useTranslations from '../../i18n/translations';

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
	title,
	fieldName = 'inputName'
}: TextEditModalProps) {
	const t = useTranslations();

	return (
		<Modal
			title={title ?? t.editModal.title}
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
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor={fieldName}
								className={formStyle.formLabel}
							>
								{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
							</label>
							<Field
								name={fieldName}
								type='text'
								placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
								className={formStyle.formInput}
							/>
							<ErrorMessage
								name={fieldName}
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<Button
							text={`${t.editModal.update} ${fieldName}`}
							disabled={isSubmitting}
							onClick={() => {
								submit(values);
							}}
							theme='secondary'
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
