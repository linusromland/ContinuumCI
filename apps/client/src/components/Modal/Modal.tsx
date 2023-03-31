// External dependencies
import { useRef } from 'react';

// Internal dependencies
import style from './Modal.module.scss';

export default function Modal({
	children,
	onClose,
	open,
	title
}: {
	children: React.ReactNode;
	onClose: () => void;
	open: boolean;
	title: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	if (!open) return null;

	return (
		<div
			className={style.modal}
			onClick={() => {
				if (
					ref.current &&
					ref.current.contains(event?.target as Node)
				) {
					return;
				}

				onClose();
			}}
		>
			<div
				className={style.modalContent}
				ref={ref}
			>
				<img
					src='/icons/cross.svg'
					alt='Close modal'
					className={style.close}
					onClick={onClose}
				/>
				<h2 className={style.title}>{title}</h2>
				{children}
			</div>
		</div>
	);
}
