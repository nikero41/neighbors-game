import { useReducer } from "react";

import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import styles from "../components/UI/Modal.module.scss";

export enum errorActions {
	"ERROR",
	"CLEAR_ERROR",
}

const errorReducer = (
	state: string,
	action: { type: errorActions; error?: Error },
) => {
	switch (action.type) {
		case errorActions.ERROR:
			return action.error?.message ?? "An error has occurred";
		case errorActions.CLEAR_ERROR:
			return "";
		default:
			return state;
	}
};

export const useError = () => {
	const [error, dispatchError] = useReducer(errorReducer, "");

	const errorButtons = (
		<div>
			<Button
				className={`${styles["modal__btn"]} ${styles["modal__btn--primary"]}`}
				onClick={() => location.reload()}
			>
				Reload
			</Button>
		</div>
	);

	const ErrorModal = () => {
		return (
			<>
				{error && (
					<Modal
						teleport
						header="An error occured"
						body={error}
						actions={errorButtons}
					/>
				)}
			</>
		);
	};

	return {
		ErrorModal,
		throwError: dispatchError,
	};
};
