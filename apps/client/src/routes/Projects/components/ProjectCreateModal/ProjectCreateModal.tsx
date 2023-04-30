// External dependencies
import { Formik, Field, ErrorMessage, Form, FormikValues } from 'formik';
import * as Yup from 'yup';

// Internal dependencies
import formStyle from '../../../../styles/formStyle.module.scss';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import useTranslations from '../../../../i18n/translations';

interface ProjectCreateModalProps {
	onClose: (update: boolean) => void;
	submit: (values: FormikValues) => void;
	open: boolean;
}

export default function ProjectCreateModal({ onClose, submit, open }: ProjectCreateModalProps) {
	const t = useTranslations();

	return (
		<Modal
			title={t.projects.newProject.title}
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
						.min(3, t.projects.newProject.schema.name.min)
						.required(t.projects.newProject.schema.name.required),
					gitUrl: Yup.string()
						.url(t.projects.newProject.schema.repositoryUrl.invalid)
						.required(t.projects.newProject.schema.repositoryUrl.invalid)
						.matches(/\.git$/, t.projects.newProject.schema.repositoryUrl.invalid),
					branch: Yup.string().required(t.projects.newProject.schema.branch.required)
				})}
				onSubmit={submit}
			>
				{({ isSubmitting, dirty }) => (
					<Form className={formStyle.form}>
						<div className={formStyle.formGroup}>
							<label
								htmlFor='name'
								className={formStyle.formLabel}
							>
								{t.projects.newProject.projectName}
							</label>
							<Field
								name='name'
								type='text'
								placeholder={t.projects.newProject.projectName}
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
								{t.projects.newProject.repositoryUrl}{' '}
								<span className={formStyle.formLabelHint}>
									{t.projects.newProject.repositoryUrlHint}
								</span>
							</label>
							<Field
								name='gitUrl'
								type='text'
								placeholder={t.projects.newProject.repositoryUrl}
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
								{t.projects.newProject.branch}
							</label>
							<Field
								name='branch'
								type='text'
								placeholder={t.projects.newProject.branch}
								className={formStyle.formInput}
							/>
							<ErrorMessage
								name='branch'
								component='div'
								className={formStyle.formError}
							/>
						</div>
						<Button
							text={t.projects.newProject.create}
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
