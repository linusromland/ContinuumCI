// External dependencies
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Internal dependencies
import { UserClass } from 'shared/src/classes';
import { getUser, updateEmail, updateUsername } from '../../../utils/api/user';
import Button from '../../../components/Button/Button';
import Widget from '../../../components/Widget/Widget';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import style from './General.module.scss';
import TextEditModal from '../../../components/TextEditModal/TextEditModal';
import formatRole from '../../../utils/formatRole';
import ChangePasswordForm from './components/ChangePasswordForm/ChangePasswordForm';

export default function GeneralSettings(): JSX.Element {
	const [changeUsernameModal, setChangeUsernameModal] = useState(false);
	const [changeEmailModal, setChangeEmailModal] = useState(false);
	const [user, setUser] = useState({} as UserClass);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		const userResponse = await getUser();
		const user = userResponse.data as UserClass;

		if (user) {
			setUser(user);
		}
	}

	return (
		<>
			<div className={style.main}>
				<Breadcrumbs
					path={[{ name: 'Settings' }, { name: 'General' }]}
				/>
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
									Account Role:
								</h3>
								<p
									className={clsx(
										style.infoContainerValue,
										style.row1,
										style.col2
									)}
								>
									{formatRole(user.role)}
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
									{user.username}
								</p>
								<Button
									text='Change'
									onClick={() => setChangeUsernameModal(true)}
									small
									secondary
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
									{user.email}
								</p>
								<Button
									text='Change'
									onClick={() => setChangeEmailModal(true)}
									small
									secondary
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
								<ChangePasswordForm />
							</div>
						</div>
					</>
				</Widget>
			</div>

			<TextEditModal
				title='Change Username'
				fieldName='username'
				open={changeUsernameModal}
				onClose={() => {
					setChangeUsernameModal(false);
				}}
				initialValues={{
					username: user.username
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().required('Username is required')
				})}
				submit={async (values) => {
					const response = await updateUsername(values.username);

					if (response.success) {
						setChangeUsernameModal(false);
						getData();
						toast.success(response.message);
					} else {
						toast.error(response.message);
					}
				}}
			/>

			<TextEditModal
				title='Change Email'
				fieldName='email'
				open={changeEmailModal}
				onClose={() => {
					setChangeEmailModal(false);
				}}
				initialValues={{
					email: user.email
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Invalid email')
						.required('Email is required')
				})}
				submit={async (values) => {
					const response = await updateEmail(values.email);

					if (response.success) {
						setChangeEmailModal(false);
						getData();
						toast.success(response.message);
					} else {
						toast.error(response.message);
					}
				}}
			/>
		</>
	);
}
