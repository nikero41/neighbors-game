import { useGameState } from "@/components/GameStateContext";
import styles from "./ProgressBar.module.scss";

export const ProgressBar = () => {
	const {
		gameState: { mainCountry, rightAnswers },
	} = useGameState();

	const totalCorrectAnswers = mainCountry?.borders.length ?? 0;
	const progress = (100 * rightAnswers) / totalCorrectAnswers;

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
