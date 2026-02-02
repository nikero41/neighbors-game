import { useGameState } from "@/components/GameStateContext";
import styles from "./ProgressBar.module.scss";

export const ProgressBar = () => {
	const {
		gameState: { mainCountry, rightAnswers },
	} = useGameState();

	const totalCorrectAnswers = mainCountry?.borders.length ?? 0;
	const progress =
		totalCorrectAnswers > 0 ? (100 * rightAnswers) / totalCorrectAnswers : 0;

	return (
		<section id="progress" className={styles["progress-bar"]}>
			<div
				id="current-progress"
				style={{ width: `${progress}%` }}
				className={styles["progress-bar__persentage"]}
			/>
		</section>
	);
};
