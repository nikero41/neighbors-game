import Card from "components/UI/Card";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

const Backdrop = () => {
	return <div className={styles["modal__backdrop"]}></div>;
};

interface Props {
	teleport?: boolean;
	header?: string;
	body?: React.ReactNode | string;
	actions?: React.ReactNode;
}

const Modal: React.FC<Props> = props => {
	const modal = (
		<>
			<Backdrop />
			<Card className={`${styles["modal"]}`}>
				{props.header && (
					<header className={styles["modal__header"]}>{props.header}</header>
				)}

				<main className={styles["modal__body"]}>
					{props.body ?? props.children}
				</main>

				{props.actions && (
					<footer className={styles["modal__actions"]}>{props.actions}</footer>
				)}
			</Card>
		</>
	);

	if (props.teleport) {
		return createPortal(
			modal,
			document.querySelector<HTMLDivElement>("#overlays")!,
		);
	}
	return modal;
};

export default Modal;
