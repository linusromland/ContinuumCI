// External dependencies
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import formStyle from '../../../../styles/formStyle.module.scss';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';

interface ProjectCreateModalProps {
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
}

export default function ProjectCreateModal({ onClose, submit, open }: ProjectCreateModalProps) {
	return (
		<Modal
			title='Create new project'
			onClose={() => onClose(false)}
			open={open}
		>
			<Formik
				initialValues={{
					name: '',
					gitUrl: '',
					branch: 'HEAD'
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string().min(3, 'Must be 3 characters or more').required('Required'),
					gitUrl: Yup.string().url('Must be a valid URL').required('Required'),
					branch: Yup.string().required('Required')
				})}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onSubmit={() => {}} // This is required for the validation to work
			>
				{({ isSubmitting, values }) => (
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='name'
								className={formStyle.formLabel}
							>
								Project name
							</label>
							<Field
								name='name'
								type='text'
								placeholder='Project name'
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
								htmlFor='gitUrl'
								className={formStyle.formLabel}
							>
								Git URL <span className={formStyle.formLabelHint}>(should end with .git)</span>
							</label>
							<Field
								name='gitUrl'
								type='text'
								placeholder='Git URL'
								className={formStyle.formInput}
							/>
							<ErrorMessage
								name='gitUrl'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='branch'
								className={formStyle.formLabel}
							>
								Branch
							</label>
							<Field
								name='branch'
								type='text'
								placeholder='Branch'
								className={formStyle.formInput}
							/>
							<ErrorMessage
								name='branch'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<Button
							text='Create project'
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
