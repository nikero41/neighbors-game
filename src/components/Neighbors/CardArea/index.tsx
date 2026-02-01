import { memo } from "react";
import Modal from "components/UI/Modal";

import styles from "./CardArea.module.scss";

interface Props {
	children: React.ReactNode;
	showModal: boolean;
	message: string;
}
const CardArea: React.FC<Props> = props => (
	<section className={styles["neighbours"]}>
		{props.showModal && <Modal header="Game over" body={props.message} />}
		{props.children}
	</section>
);

export default memo(CardArea);
