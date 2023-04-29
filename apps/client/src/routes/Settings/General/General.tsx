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
import useTranslations from '../../../i18n/translations';
import { Loading } from '../../../components/Loading/Loading';

export default function GeneralSettings(): JSX.Element {
	const t = useTranslations();
	const [changeUsernameModal, setChangeUsernameModal] = useState(false);
	const [changeEmailModal, setChangeEmailModal] = useState(false);
	const [user, setUser] = useState({} as UserClass);
	const [dataReady, setDataReady] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		const userResponse = await getUser();
		const user = userResponse.data as UserClass;

		if (user) {
			setUser(user);
		}
		setDataReady(true);
	}

	if (!dataReady) return <Loading />;

	return (
		<>
			<div className={style.main}>
				<Breadcrumbs path={[{ name: t.settings.title }, { name: t.generalSettings.general }]} />
				<h1 className={style.title}>{t.generalSettings.title}</h1>
				<Widget>
					<div className={style.container}>
						<h2 className={style.subtitle}>Account Settings</h2>

						<div className={style.infoContainer}>
							<h3 className={clsx(style.infoContainerTitle, style.row1, style.col1)}>
								{t.generalSettings.accountRole}:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row1, style.col2)}>
								{formatRole(user.role, t)}
							</p>
							<h3 className={clsx(style.infoContainerTitle, style.row2, style.col1)}>
								{t.generalSettings.username}:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row2, style.col2)}>{user.username}</p>
							<Button
								text={t.generalSettings.change}
								onClick={() => setChangeUsernameModal(true)}
								small
								theme='secondary'
								className={clsx(style.row2, style.col3)}
							/>
							<h3 className={clsx(style.infoContainerTitle, style.row3, style.col1)}>
								{t.generalSettings.email}:
							</h3>
							<p className={clsx(style.infoContainerValue, style.row3, style.col2)}>{user.email}</p>
							<Button
								text={t.generalSettings.change}
								onClick={() => setChangeEmailModal(true)}
								small
								theme='secondary'
								className={clsx(style.row3, style.col3)}
							/>
						</div>
					</div>
				</Widget>
				<Widget>
					<div className={style.container}>
						<h2 className={style.subtitle}>
							{t.generalSettings.change} {t.generalSettings.email.toLocaleLowerCase()}
						</h2>

						<div className={style.infoContainer}>
							<ChangePasswordForm />
						</div>
					</div>
				</Widget>
			</div>

			<TextEditModal
				title={`${t.generalSettings.change} ${t.generalSettings.username.toLowerCase()}`}
				fieldName={t.generalSettings.username.toLowerCase()}
				open={changeUsernameModal}
				onClose={() => {
					setChangeUsernameModal(false);
				}}
				initialValues={{
					[t.generalSettings.username.toLowerCase()]: user.username
				}}
				validationSchema={Yup.object().shape({
					[t.generalSettings.username.toLowerCase()]: Yup.string().required(
						t.generalSettings.usernameRequired
					)
				})}
				submit={async (values) => {
					const response = await updateUsername(values.username);

					if (response.success) {
						setChangeUsernameModal(false);
						getData();
						toast.success(t.generalSettings.usernameSuccess);
					} else {
						toast.error(t.generalSettings.usernameError);
					}
				}}
			/>

			<TextEditModal
				title={`${t.generalSettings.change} ${t.generalSettings.email.toLowerCase()}`}
				fieldName={t.generalSettings.email.toLowerCase()}
				open={changeEmailModal}
				onClose={() => {
					setChangeEmailModal(false);
				}}
				initialValues={{
					[t.generalSettings.email.toLowerCase()]: user.email
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email(t.generalSettings.emailInvalid).required(t.generalSettings.emailRequired)
				})}
				submit={async (values) => {
					const response = await updateEmail(values.email);

					if (response.success) {
						setChangeEmailModal(false);
						getData();
						toast.success(t.generalSettings.emailSuccess);
					} else {
						toast.error(t.generalSettings.emailError);
					}
				}}
			/>
		</>
	);
}
