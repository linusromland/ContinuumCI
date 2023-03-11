// External dependencies
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';

// Internal dependencies
import Button from '../../../components/Button/Button';
import Widget from '../../../components/Widget/Widget';
import style from './General.module.scss';

export default function GeneralSettings(): JSX.Element {
	return (
		<div className={style.main}>
			<h1 className={style.title}>General Settings</h1>
			<Widget>
				<>
					<div className={style.container}>
						<h2 className={style.subtitle}>Account Settings</h2>

						<div className={style.infoContainer}>
							<h3
								className={clsx(
									style.infoContainerTitle,
									style.row1,
									style.col1
								)}
							>
								Account Type:
							</h3>
							<p
								className={clsx(
									style.infoContainerValue,
									style.row1,
									style.col2
								)}
							>
								Administrator
							</p>
							<h3
								className={clsx(
									style.infoContainerTitle,
									style.row2,
									style.col1
								)}
							>
								Username:
							</h3>
							<p
								className={clsx(
									style.infoContainerValue,
									style.row2,
									style.col2
								)}
							>
								linusromland
							</p>
							<Button
								text='Change'
								onClick={() => console.log('Change username')}
								small
								className={clsx(style.row2, style.col3)}
							/>
							<h3
								className={clsx(
									style.infoContainerTitle,
									style.row3,
									style.col1
								)}
							>
								Email:
							</h3>
							<p
								className={clsx(
									style.infoContainerValue,
									style.row3,
									style.col2
								)}
							>
								hello@linusromland.com
							</p>
							<Button
								text='Change'
								onClick={() => console.log('Change email')}
								small
								className={clsx(style.row3, style.col3)}
							/>
						</div>
					</div>
				</>
			</Widget>
			<Widget>
				<>
					<div className={style.container}>
						<h2 className={style.subtitle}>Change password</h2>

						<div className={style.infoContainer}>
							<Formik
								initialValues={{
									oldPassword: '',
									newPassword: '',
									confirmPassword: ''
								}}
								validationSchema={Yup.object().shape({
									oldPassword: Yup.string().required(
										'Password is required'
									),
									newPassword: Yup.string()
										.min(
											8,
											'Password must be at least 8 characters'
										)
										.required('Password is required'),
									confirmPassword: Yup.string()
										.oneOf(
											[Yup.ref('newPassword')],
											'Passwords must match'
										)
										.required('Password is required')
								})}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										alert(JSON.stringify(values, null, 2));
										setSubmitting(false);
									}, 400);
								}}
							>
								{({ isSubmitting }) => (
									<Form className={style.form}>
										<div className={style.formGroup}>
											<label
												htmlFor='oldPassword'
												className={style.formLabel}
											/>
											<Field
												name='oldPassword'
												type='password'
												placeholder='Old password'
												className={style.formInput}
											/>
											<ErrorMessage
												name='oldPassword'
												component='div'
												className={style.formError}
											/>
										</div>
										<div className={style.formGroup}>
											<label
												htmlFor='newPassword'
												className={style.formLabel}
											/>
											<Field
												name='newPassword'
												type='password'
												placeholder='New password'
												className={style.formInput}
											/>
											<ErrorMessage
												name='newPassword'
												component='div'
												className={style.formError}
											/>
										</div>
										<div className={style.formGroup}>
											<label
												htmlFor='confirmPassword'
												className={style.formLabel}
											/>
											<Field
												name='confirmPassword'
												type='password'
												placeholder='Confirm password'
												className={style.formInput}
											/>
											<ErrorMessage
												name='confirmPassword'
												component='div'
												className={style.formError}
											/>
										</div>
										<Button
											text='Change password'
											disabled={isSubmitting}
											onClick={() =>
												console.log('Change email')
											}
											small
											className={clsx(
												style.row2,
												style.col1
											)}
										/>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</>
			</Widget>
		</div>
	);
}
