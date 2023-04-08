// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import style from './CreateVariableModal.module.scss';
import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import CustomMultiSelect from '../../../../components/CustomSelect/CustomMultiSelect';

export default function CreateVariableModal({
	serviceList,
	onClose,
	submit,
	open
}: {
	serviceList: string[];
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
}) {
	return (
		<Modal
			title='Create environment variable'
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					name: '',
					value: '',
					services: []
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string()
						.required('Required')
						.matches(/^[a-zA-Z0-9_]+$/, 'Only alphanumeric characters and underscores are allowed'),
					value: Yup.string().required('Required'),
					// String array with at least one element
					services: Yup.array().of(Yup.string()).min(1, 'At least one service is required')
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
						<div className={style.formGroup}>
							<label
								htmlFor='services'
								className={style.formLabel}
							/>
							<Field
								name='services'
								component={CustomMultiSelect}
								options={serviceList.map((service) => ({
									value: service,
									label: service
								}))}
								placeholder='Available to what services?'
							/>
							<ErrorMessage
								name='services'
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text='Create Variable'
							disabled={isSubmitting}
							onClick={() => {
								submit({
									...values,
									services: values.services.map(
										(service: { value: string; label: string }) => service.value
									)
								});
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
