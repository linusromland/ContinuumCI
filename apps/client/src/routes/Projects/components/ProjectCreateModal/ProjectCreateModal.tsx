// External dependencies
import clsx from 'clsx';
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import style from './ProjectCreateModal.module.scss';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';

export default function ProjectCreateModal({
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
					name: Yup.string()
						.min(3, 'Must be 3 characters or more')
						.required('Required'),
					gitUrl: Yup.string()
						.url('Must be a valid URL')
						.required('Required'),
					branch: Yup.string().required('Required')
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
								placeholder='Project name'
								className={style.formInput}
							/>
							<ErrorMessage
								name='name'
								component='div'
								className={style.formError}
							/>
							<label
								htmlFor='gitUrl'
								className={style.formLabel}
							/>
							<Field
								name='gitUrl'
								type='text'
								placeholder='Git URL'
								className={style.formInput}
							/>
							<ErrorMessage
								name='gitUrl'
								component='div'
								className={style.formError}
							/>
							<label
								htmlFor='branch'
								className={style.formLabel}
							/>
							<Field
								name='branch'
								type='text'
								placeholder='Branch'
								className={style.formInput}
							/>
							<ErrorMessage
								name='branch'
								component='div'
								className={style.formError}
							/>
						</div>
						<Button
							text='Create project'
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
