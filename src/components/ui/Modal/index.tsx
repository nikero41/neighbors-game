import { createPortal } from "react-dom";

import { Card } from "@/components/ui/Card";
import styles from "./Modal.module.scss";

const Backdrop = () => <div className={styles["modal__backdrop"]} />;

const overlaysDivElement = document.querySelector<HTMLDivElement>("#overlays");
if (!overlaysDivElement) throw new Error("overlaysDivElement not found");

export const Modal = ({
	teleport,
	header,
	actions,
	children,
}: {
	teleport?: boolean;
	header?: string;
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

				<main className={styles["modal__body"]}>{children}</main>

				{actions && (
					<footer className={styles["modal__actions"]}>{actions}</footer>
				)}
			</Card>
		</>
	);

	if (teleport) {
		return createPortal(modal, overlaysDivElement);
	}
	return modal;
};
