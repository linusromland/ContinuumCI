// External dependencies
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import formStyle from '../../../../styles/formStyle.module.scss';
import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import CustomMultiSelect from '../../../../components/CustomSelect/CustomMultiSelect';
import useTranslations from '../../../../i18n/translations';

interface CreateVariableModalProps {
	serviceList: string[];
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
}

export default function CreateVariableModal({ serviceList, onClose, submit, open }: CreateVariableModalProps) {
	const t = useTranslations();

	return (
		<Modal
			title={t.createEnviromentVariables.title}
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
						.required(t.createEnviromentVariables.schema.name.required)
						.matches(/^[a-zA-Z0-9_]+$/, t.createEnviromentVariables.schema.name.match),
					value: Yup.string().required(t.createEnviromentVariables.schema.value.required),
					// String array with at least one element
					services: Yup.array()
						.of(
							Yup.object({
								value: Yup.string(),
								label: Yup.string()
							})
						)
						.min(1, t.createEnviromentVariables.schema.services.min)
				})}
				onSubmit={(values) => {
					submit({
						...values,
						services: values.services.map((service: { value: string; label: string }) => service.value)
					});
				}}
			>
				{({ isSubmitting, dirty }) => (
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='name'
								className={formStyle.formLabel}
							>
								{t.enviromentVariablesTable.name}
							</label>
							<Field
								name='name'
								type='text'
								placeholder={t.enviromentVariablesTable.name}
								className={formStyle.formInput}
							/>
							<ErrorMessage
								name='name'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='value'
								className={formStyle.formLabel}
							>
								{t.enviromentVariablesTable.value}
							</label>
							<Field
								name='value'
								type='text'
								placeholder={t.enviromentVariablesTable.value}
								className={formStyle.formInput}
							/>
							<ErrorMessage
								name='value'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='services'
								className={formStyle.formLabel}
							>
								{t.enviromentVariablesTable.services}
							</label>
							<Field
								name='services'
								component={CustomMultiSelect}
								options={serviceList.map((service) => ({
									value: service,
									label: service
								}))}
								placeholder={t.enviromentVariablesTable.availableServices}
							/>
							<ErrorMessage
								name='services'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<Button
							text={t.createEnviromentVariables.title}
							disabled={isSubmitting || !dirty}
							type='submit'
							theme='secondary'
							icon='/icons/save.svg'
							loading={isSubmitting}
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
