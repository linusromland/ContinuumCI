// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import style from './CreateVariableModal.module.scss';
import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';

export default function CreateVariableModal({
	onClose,
	submit,
	open
}: {
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
}) {
	return (
		<Modal
			title='Create Enviroment Variable'
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					name: '',
					value: ''
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string()
						.required('Required')
						.matches(
							/^[a-zA-Z0-9_]+$/,
							'Only alphanumeric characters and underscores are allowed'
						),
					value: Yup.string().required('Required')
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={style.form}>
						<div className={style.formGroup}>
							<label
								htmlFor='name'
								className={style.formLabel}
							/>
							<Field
								name='name'
								type='text'
								placeholder='Name'
								className={style.formInput}
							/>
							<ErrorMessage
								name='name'
								component='div'
								className={style.formError}
							/>
						</div>
						<div className={style.formGroup}>
							<label
								htmlFor='value'
								className={style.formLabel}
							/>
							<Field
								name='value'
								type='text'
								placeholder='Value'
								className={style.formInput}
							/>
							<ErrorMessage
								name='value'
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text='Create Variable'
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
