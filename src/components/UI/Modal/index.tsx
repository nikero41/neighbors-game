import Card from "components/UI/Card";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

const Backdrop = () => <div className={styles["modal__backdrop"]} />;

const Modal = ({
	teleport,
	header,
	body,
	actions,
	children,
}: {
	teleport?: boolean;
	header?: string;
	body?: React.ReactNode | string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
}) => {
	const modal = (
		<>
			<Backdrop />

			<Card className={styles["modal"]}>
				{header && (
					<header className={styles["modal__header"]}>{header}</header>
				)}

				<main className={styles["modal__body"]}>{body ?? children}</main>

				{actions && (
					<footer className={styles["modal__actions"]}>{actions}</footer>
				)}
			</Card>
		</>
	);

	if (teleport) {
		return createPortal(
			modal,
			document.querySelector<HTMLDivElement>("#overlays")!,
		);
	}
	return modal;
};

export default Modal;
