// Internal dependencies
import Button from '../../components/Button/Button';
import style from './Applications.module.scss';
import Header from './components/Header/Header';
import StatusBar from './components/StatusBar/StatusBar';

export default function Applications() {
	return (
		<main className={style.main}>
			<Header />
			<div className={style.container}>
				<div className={style.topBar}>
					<div className={style.statusBar}>
						<StatusBar
							succeeded={50}
							warning={25}
							failed={25}
						/>
					</div>
					<Button
						text='New Application'
						onClick={() => {
							console.log('clicked');
						}}
					/>
				</div>
			</div>
		</main>
	);
}
