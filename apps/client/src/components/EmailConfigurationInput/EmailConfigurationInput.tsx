// External Dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

// Internal Dependencies
import Button from '../Button/Button';
import CustomSelect from '../CustomSelect/CustomSelect';
import style from './EmailConfigurationInput.module.scss';
import formStyle from '../../styles/formStyle.module.scss';
import useTranslations from '../../i18n/translations';

const EmailConfigurationSchema = Yup.object().shape({
	service: Yup.object().shape({
		value: Yup.string().required('Service is required'),
		label: Yup.string().required('Service is required')
	}),
	gmail: Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string().required('Password is required')
	})
});

interface EmailConfigurationInputProps {
	initialValues?: {
		service: {
			value: string;
			label: string;
		};
		gmail: {
			email: string;
			password: string;
		};
	};
	onSubmit: (
		skip?: boolean,
		values?: {
			service: {
				value: string;
				label: string;
			};
			gmail: {
				email: string;
				password: string;
			};
		}
	) => void;
	saveButtonText?: string;
	hideSkip?: boolean;
}

export default function EmailConfigurationInput({
	initialValues = {
		service: {
			value: 'gmail',
			label: 'Gmail'
		},
		gmail: {
			email: '',
			password: ''
		}
	},
	hideSkip,
	saveButtonText,
	onSubmit
}: EmailConfigurationInputProps): JSX.Element {
	const t = useTranslations();

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			validationSchema={EmailConfigurationSchema}
			onSubmit={async (values) => {
				await onSubmit(false, values);
			}}
		>
			{({ dirty, isSubmitting, values }) => (
				<Form className={formStyle.form}>
					<div className={formStyle.formGroup}>
						<label className={formStyle.formLabel}>{t.mail.service}</label>
						<Field
							name='service'
							placeholder='Service'
							component={CustomSelect}
							options={[{ value: 'gmail', label: 'Gmail' }]}
						/>
						<ErrorMessage
							name='service'
							component='div'
							className={formStyle.formError}
						/>
					</div>

					{values.service.value === 'gmail' && (
						<>
							<div className={formStyle.formGroup}>
								<label className={formStyle.formLabel}>{t.mail.email}</label>
								<Field
									name='gmail.email'
									placeholder={t.mail.email}
									className={formStyle.formInput}
								/>
								<ErrorMessage
									name='gmail.email'
									component='div'
									className={formStyle.formError}
								/>
							</div>

							<div className={formStyle.formGroup}>
								<label className={formStyle.formLabel}>{t.mail.oneTimePassword}</label>

								<Field
									name='gmail.password'
									placeholder={t.mail.oneTimePassword}
									type='password'
									className={formStyle.formInput}
								/>
								<ErrorMessage
									name='gmail.password'
									component='div'
									className={formStyle.formError}
								/>
							</div>
						</>
					)}
					<div className={style.buttons}>
						{!hideSkip && (
							<Button
								text={t.mail.skip}
								type='button'
								onClick={() => onSubmit(true)}
								small
							/>
						)}

						<Button
							text={saveButtonText || t.mail.continue}
							type='submit'
							disabled={!dirty || isSubmitting}
							icon='/icons/save.svg'
							loading={isSubmitting}
							small
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
