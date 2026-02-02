import { memo } from "react";
import Modal from "components/UI/Modal";

import styles from "./CardArea.module.scss";

const CardArea = ({
	showModal,
	message,
	children,
}: {
	children: React.ReactNode;
	showModal: boolean;
	message: string;
}) => (
	<section className={styles["neighbours"]}>
		{showModal && <Modal header="Game over" body={message} />}
		{children}
	</section>
);

export default memo(CardArea);
